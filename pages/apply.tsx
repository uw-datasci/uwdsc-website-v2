import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { motion } from "framer-motion";
import SEO from "@/components/SEO/SEO";
import { RootState } from "@/store/store";
import {
  getCurrentTerm,
  getCurrentUserApplication,
  createOrUpdateApplication,
} from "@/utils/apiCalls";

// Form Components
import AppIntro from "@/components/forms/application/AppIntro";
import PersonalDetails from "@/components/forms/application/PersonalDetails";
import General from "@/components/forms/application/General";
import Positions from "@/components/forms/application/Positions";
import Supplementary from "@/components/forms/application/Supplementary";
import Submitted from "@/components/forms/application/Submitted";

// UI Components
import Button from "@/components/UI/Button";

// Types
import { ApplicationFormValues, Term } from "@/types/application";
import { ClockIcon, LinkIcon, MoveLeft, MoveRight, User } from "lucide-react";
import {
  PERSONAL_FIELDS,
  STEP_NAMES,
  BLANK_APPLICATION,
  GENERAL_FIELDS,
} from "@/constants/application";
import Link from "next/link";

const validationSchema = Yup.object({
  resumeUrl: Yup.string()
    .url("Must be a valid URL")
    .required("Resume URL is required"),

  roleQuestionAnswers: Yup.object().shape({
    general: Yup.object().shape({
      full_name: Yup.string().required("Full Name is required"),
      personal_email: Yup.string()
        .email("Invalid email format")
        .required("Personal Email is required"),
      waterloo_email: Yup.string()
        .email("Invalid email format")
        .matches(/@(uwaterloo\.ca|edu\.uwaterloo\.ca)$/, "Must be a UW email")
        .required("UW Email is required"),
      program: Yup.string().required("Program is required"),
      academic_term: Yup.string().required("Academic Term is required"),
      location: Yup.string().required("Location is required"),

      club_experience: Yup.boolean().test(
        "is-defined",
        "Please indicate if you've been a member of the UW Data Science Club before.",
        (value) => value !== undefined && value !== null,
      ),

      skills: Yup.string().required("Skills is required"),
      motivation: Yup.string().required("Motivation is required"),
    }),
  }),
});

export default function ApplyPage() {
  const router = useRouter();
  const signedIn = useSelector((state: RootState) => state.loginToken.name);

  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [currentTerm, setCurrentTerm] = useState<Term | null>(null);
  const [isApplicationsOpen, setIsApplicationsOpen] = useState(false);
  const [loadingTerm, setLoadingTerm] = useState(true);
  const [currentStep, setCurrentStep] = useState(0); // 0: intro, 1: personal, 2: general, 3: positions, 4: supplementary
  const [appExists, setHasExistingApplication] = useState(false);

  const [isPositionsPageValid, setIsPositionsPageValid] = useState(false);
  const [isSupplementaryPageValid, setIsSupplementaryPageValid] =
    useState(false);

  // Step navigation functions
  const goToNextStep = () => setCurrentStep((prev) => prev + 1);
  const goToPreviousStep = () => setCurrentStep((prev) => prev - 1);

  // Validation logic for each step
  const isStepValid = (step: number) => {
    const allGeneralAnswers = formik.values.roleQuestionAnswers?.general || {};
    const allGeneralErrors = formik.errors.roleQuestionAnswers?.general || {};
    switch (step) {
      case 1:
        const { skills, motivation, ...generalPersonalAnswers } =
          allGeneralAnswers;
        const {
          skills: errSkills,
          motivation: errMotivation,
          ...generalPersonalErrors
        } = allGeneralErrors;

        const hasEmptyPersonalFields = PERSONAL_FIELDS.some((field) => {
          const value =
            generalPersonalAnswers[
              field as keyof typeof generalPersonalAnswers
            ];
          // For boolean fields, check if they are undefined/null, not falsy
          if (typeof value === "boolean") {
            return value === undefined || value === null;
          }
          // For string fields, check if empty or undefined
          return !value || value === "";
        });

        const hasPersonalErrors = PERSONAL_FIELDS.some((field) =>
          Boolean(
            generalPersonalErrors[field as keyof typeof generalPersonalErrors],
          ),
        );

        return !hasEmptyPersonalFields && !hasPersonalErrors;

      case 2: // General
        const generalAnswers = {
          skills: allGeneralAnswers.skills,
          motivation: allGeneralAnswers.motivation,
        };

        const generalErrors = {
          skills: allGeneralErrors.skills,
          motivation: allGeneralErrors.motivation,
        };

        const hasEmptyGeneralAnswers = GENERAL_FIELDS.some(
          (field) =>
            !generalAnswers[field as keyof typeof generalAnswers] ||
            generalAnswers[field as keyof typeof generalAnswers] === "",
        );
        const hasGeneralErrors = GENERAL_FIELDS.some((field) =>
          Boolean(generalErrors[field as keyof typeof generalErrors]),
        );

        return !hasEmptyGeneralAnswers && !hasGeneralErrors;

      case 3: // Positions
        // handled with IsPositionsPageValid
        return false;

      case 4: // Supplementary
        // handled with setIsSupplementaryPageValid
        return false;

      default:
        return true;
    }
  };

  const handleNext = async () => {
    await saveSectionAndNext();
  };

  const handlePrevious = () => goToPreviousStep();

  const startApplication = async () => {
    if (!currentTerm) return;
    try {
      if (!appExists) {
        await createOrUpdateApplication({
          termApplyingFor: currentTerm.id,
          ...BLANK_APPLICATION,
        });
      }
      setCurrentStep(1);
    } catch (error) {
      console.error("Failed to start application:", error);
    }
  };

  const saveSectionAndNext = async () => {
    if (!currentTerm) return;
    try {
      // if user filled out questions for a role and switched out of the role,
      // clear their previous answers for unselected roles before submitting
      const selectedRoles = [
        ...formik.values.rolesApplyingFor,
        "general",
        "supplementary",
      ];
      let roleQA = formik.values.roleQuestionAnswers;
      for (const [role, answers] of Object.entries(roleQA)) {
        if (!selectedRoles.includes(role)) {
          delete roleQA[role];
        }
      }

      await createOrUpdateApplication({
        termApplyingFor: currentTerm.id,
        rolesApplyingFor:
          currentStep > 1
            ? formik.values.rolesApplyingFor.filter(
                (role) => role !== "None" && role,
              )
            : [],
        roleQuestionAnswers: roleQA,
        resumeUrl: formik.values.resumeUrl,
        status: "draft",
      });

      goToNextStep();
    } catch (error) {
      console.error("Failed to save application section:", error);
    }
  };

  const submitApplication = async (values: ApplicationFormValues) => {
    if (!currentTerm) return;

    setIsLoading(true);
    setSubmitError("");

    try {
      await createOrUpdateApplication({
        termApplyingFor: currentTerm.id,
        rolesApplyingFor: formik.values.rolesApplyingFor.filter(
          (role) => role !== "None" && role,
        ),
        roleQuestionAnswers: values.roleQuestionAnswers,
        resumeUrl: values.resumeUrl,
        status: "submitted",
      });

      setSubmitSuccess(true);
      setCurrentStep(5); // Move to success step
    } catch (error: any) {
      setSubmitError(error.response?.data?.error || "Failed to submit");
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik<ApplicationFormValues>({
    initialValues: {
      resumeUrl: "",
      roleQuestionAnswers: {
        general: {},
        supplementary: {},
      },
      rolesApplyingFor: [],
    },
    validationSchema,
    onSubmit: submitApplication,
  });

  // Fetch data on component mount and when signed in status changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current term data
        const termResponse = await getCurrentTerm();
        if (termResponse.data.isOpen) {
          setCurrentTerm(termResponse.data.term);
          setIsApplicationsOpen(true);
        } else {
          setIsApplicationsOpen(false);
        }

        // Pre-fill form with existing application data if user is signed in
        if (signedIn) {
          try {
            const applicationResponse = await getCurrentUserApplication();
            const application = applicationResponse.data.application;

            if (application) {
              formik.setValues({
                ...formik.values,
                rolesApplyingFor: application.rolesApplyingFor || [],
                resumeUrl: application.resumeUrl || "",
                roleQuestionAnswers: application.roleQuestionAnswers || {},
              });
              setHasExistingApplication(true);
              if (application.status === "submitted") {
                setCurrentStep(5); // reroute to submitted page if application submitted
              }
            }
          } catch (error) {
            console.error("Error fetching application data:", error);
            // Don't throw error here as user might not have an existing application
          }
        }
      } catch (error) {
        console.error("Error fetching current term:", error);
        setIsApplicationsOpen(false);
      } finally {
        setLoadingTerm(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signedIn]);

  // Redirect if not signed in
  useEffect(() => {
    if (!signedIn) router.push("/");
  }, [signedIn, router]);

  if (loadingTerm) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isApplicationsOpen) {
    return (
      <>
        <SEO title="Applications" />
        <div className="flex min-h-screen items-center justify-center bg-black px-4">
          <div className="max-w-md text-center">
            <h1 className="mb-4 text-3xl font-bold text-white">
              Applications Closed
            </h1>
            <p className="mb-6 text-grey1">
              Applications are not currently open. Please check back later or
              follow our social media for updates on when applications will
              open.
            </p>
            <Button
              type="button"
              hierarchy="primary"
              rounded="rounded-md"
              onClick={() => router.push("/")}
            >
              Go Home
            </Button>
          </div>
        </div>
      </>
    );
  }

  const renderCurrentStep = () => {
    if (!currentTerm) return null;

    switch (currentStep) {
      case 0:
        return <AppIntro onStart={startApplication} appExists={appExists} />;
      case 1:
        return (
          <PersonalDetails formik={formik} questions={currentTerm.questions} />
        );
      case 2:
        return <General questions={currentTerm.questions} formik={formik} />;
      case 3:
        return (
          <Positions
            formik={formik}
            questions={currentTerm.questions}
            isNextValid={setIsPositionsPageValid}
          />
        );
      case 4:
        return (
          <Supplementary
            formik={formik}
            questions={currentTerm.questions}
            isNextValid={setIsSupplementaryPageValid}
          />
        );
      case 5:
        return <Submitted />;
      default:
        return null;
    }
  };

  if (!currentTerm) return <div>No apps lol</div>;

  return (
    <>
      <SEO title="DSC Application" />

      <progress
        value={currentStep - 1}
        max={4}
        className="p- 0 [&::-webkit-progress-value]:duration-700[&::-webkit-progress-value]:ease-in-out
        relative z-20 m-0 block h-2 w-full bg-grey4 transition-all duration-700 ease-in-out
        [&::-moz-progress-bar]:bg-lightBlue [&::-moz-progress-bar]:transition-all [&::-moz-progress-bar]:duration-700
        [&::-moz-progress-bar]:ease-in-out [&::-webkit-progress-bar]:bg-grey4  [&::-webkit-progress-value]:bg-lightBlue
        [&::-webkit-progress-value]:transition-all"
      />

      <div className="relative min-h-screen overflow-hidden bg-darkBlue2 px-4 py-20 shadow-md backdrop-blur-md">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Left Whale */}
          <div className="absolute">
            <Image
              src="/execApps/B-light-bulb.svg"
              alt=""
              width={450}
              height={450}
            />
          </div>

          {/* Right Whale on Cloud */}
          <div className="absolute right-0 top-[10%] z-20">
            <Image
              src="/execApps/B-stand.svg"
              alt=""
              width={350}
              height={350}
            />
          </div>

          <div className="absolute right-0 top-1/2 z-10">
            <Image src="/execApps/cloud.svg" alt="" width={380} height={144} />
          </div>
        </div>

        {currentStep === 0 || currentStep === 5 ? (
          <div className="relative z-10">{renderCurrentStep()}</div>
        ) : (
          <div className="relative z-10 mx-auto max-w-4xl">
            {/* Application Header & Deadline */}
            <div className="mx-auto mb-8 max-w-4xl text-center">
              <div className="mb-2 flex justify-center">
                <div className="inline-flex items-center rounded-full border-yellowBorder bg-yellowBackground px-10 py-2 text-xs font-semibold text-yellowText">
                  <span className="mr-2 flex items-center">
                    <ClockIcon className="h-4 w-4" />
                  </span>
                  {new Date(currentTerm.appDeadline).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric", year: "numeric" },
                  ) || "Jul 30, 2025"}
                </div>
              </div>
              <h1 className="mb-2 text-3xl font-bold text-white">
                DSC Exec Application Form
              </h1>
              <p className="text-3xl font-semibold text-lightBlue">
                {currentTerm.termName}
              </p>
            </div>

            {/* Join DSC Notion Link */}
            <Link href="https://uw-dsc.notion.site/join-dsc" target="_blank">
              <motion.div
                className="relative mb-4 flex gap-4 overflow-hidden rounded-lg border border-solid border-lightBlue/50 bg-lightBlue/30 p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                    "0 0 0 4px rgba(59, 130, 246, 0.1)",
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{
                  duration: 0.6,
                  boxShadow: {
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 4,
                  },
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 25px rgba(59, 130, 246, 0.15)",
                  transition: { duration: 0.2 },
                }}
              >
                {/* Shimmer overlay */}
                <motion.div
                  className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeInOut",
                  }}
                />

                <div className="mx-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-lightBlue/20">
                  <LinkIcon className="h-4 w-4 text-lighterBlue" />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-lighterBlue">
                    Available Positions
                  </p>
                  <p className="text-sm text-lighterBlue/80">
                    Check out all available positions, their skillsets, and
                    where your strengths could make the biggest impact.
                  </p>
                </div>
              </motion.div>
            </Link>

            <form onSubmit={formik.handleSubmit}>
              <div className="mx-auto max-w-4xl rounded-lg bg-darkBlue pb-4">
                <div className="bg-gradient-blue flex items-center justify-between rounded-t-lg p-4 text-center backdrop-blur-md">
                  <div className="flex items-center justify-center px-2">
                    <div className="bg-gradient-profile mr-3 flex h-10 w-10 items-center justify-center rounded-full">
                      <User
                        className="h-5 w-5 text-white"
                        fill="currentColor"
                      />
                    </div>
                    <h1 className="text-xl font-bold text-white">
                      {STEP_NAMES[currentStep]}
                    </h1>
                  </div>
                  <p className="text-gray-400 text-md text-white">
                    Mandatory fields are marked with an asterisk (
                    <span className="text-red">*</span>)
                  </p>
                </div>
                <div className="m-6">{renderCurrentStep()}</div>
                {/* Navigation Section */}
                {currentStep >= 1 && currentStep <= 4 && (
                  <div className="mx-6 flex items-center justify-between py-6">
                    <Button
                      type="button"
                      hierarchy="secondary"
                      rounded="rounded-full"
                      onClick={handlePrevious}
                      border="border border-grey1 border-solid"
                      classes="transition-all duration-300 bg-transparent hover:scale-105 hover:shadow-lg hover:bg-grey1 w-24 sm:w-32"
                      padding="px-3 py-2 sm:px-5 sm:py-3"
                    >
                      <div className="flex items-center justify-between text-sm text-grey1 group-hover:text-darkBlue sm:text-md">
                        <MoveLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                        Previous
                      </div>
                    </Button>
                    <div className="flex justify-center space-x-2 py-4">
                      {STEP_NAMES.slice(1).map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 rounded-full transition-all duration-300 ease-in-out sm:h-3 ${
                            index + 1 == currentStep
                              ? "w-8 bg-lightBlue sm:w-10"
                              : index + 1 < currentStep
                              ? "w-2 bg-green sm:w-3"
                              : "w-2 bg-grey1 sm:w-3"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-end">
                      <Button
                        type={`${currentStep === 4 ? "submit" : "button"}`}
                        hierarchy="secondary"
                        rounded="rounded-full"
                        onClick={currentStep === 4 ? undefined : handleNext}
                        disabled={
                          currentStep === 4
                            ? !isSupplementaryPageValid
                            : currentStep === 3
                            ? !isPositionsPageValid
                            : !isStepValid(currentStep)
                        }
                        classes={`transition-all duration-300 w-24 sm:w-32 ${
                          currentStep === 4
                            ? `bg-gradient-orange ${
                                !isSupplementaryPageValid
                                  ? "cursor-not-allowed disabled"
                                  : "hover:scale-105 hover:font-semibold submit-button-hover"
                              }`
                            : isStepValid(currentStep) ||
                              (currentStep === 3 && isPositionsPageValid)
                            ? "bg-white hover:bg-grey1 hover:shadow-lg"
                            : "bg-grey1 opacity-50 cursor-not-allowed hover:shadow-lg"
                        }`}
                        padding="px-3 py-2 sm:px-5 sm:py-3"
                      >
                        <div
                          className={`flex items-center justify-between text-sm sm:text-md
                              ${
                                currentStep === 4
                                  ? "text-white"
                                  : "text-darkBlue"
                              }`}
                        >
                          {currentStep === 4 ? "Submit" : "Next"}
                          <MoveRight className="h-3 w-3 sm:h-4 sm:w-4" />
                        </div>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
