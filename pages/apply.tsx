import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import SEO from "@/components/SEO/SEO";
import { RootState } from "@/store/store";
import {
  getCurrentTerm,
  getCurrentUserApplication,
  patchApplication,
} from "@/utils/apiCalls";

// Form Components
import ApplicationIntro from "@/components/forms/application/ApplicationIntro";
import PersonalDetails from "@/components/forms/application/PersonalDetails";
import Experience from "@/components/forms/application/Experience";
import Positions from "@/components/forms/application/Positions";
import Supplementary from "@/components/forms/application/Supplementary";
import Submitted from "@/components/forms/application/Submitted";

// UI Components
import Button from "@/components/UI/Button";

// Types
import { ApplicationFormValues, Term } from "@/types/application";
import { CircleUserRound, ClockIcon, MoveLeft, MoveRight } from "lucide-react";
import {
  PERSONAL_FIELDS,
  STEP_NAMES,
  BLANK_APPLICATION,
  NO_PREV_EXPERIENCE,
} from "@/constants/application";

const validationSchema = Yup.object({
  uwEmail: Yup.string()
    .email("Invalid email format")
    .matches(/@(uwaterloo\.ca|edu\.uwaterloo\.ca)$/, "Must be a UW email")
    .required("UW Email is required"),
  personalEmail: Yup.string()
    .email("Invalid email format")
    .required("Personal Email is required"),
  fullName: Yup.string().required("Full Name is required"),
  program: Yup.string().required("Program is required"),
  academicTerm: Yup.string().required("Academic Term is required"),
  location: Yup.string().required("Location is required"),
  previousMember: Yup.boolean(),
  previousExperience: Yup.string(),
  resumeUrl: Yup.string()
    .url("Must be a valid URL")
    .required("Resume URL is required"),
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
  const [currentStep, setCurrentStep] = useState(0); // 0: intro, 1: personal, 2: experience, 3: positions, 4: supplementary
  const [hasExistingApplication, setHasExistingApplication] = useState(false);

  // Step navigation functions
  const goToNextStep = () => setCurrentStep((prev) => prev + 1);
  const goToPreviousStep = () => setCurrentStep((prev) => prev - 1);

  // Validation logic for each step
  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        const hasEmptyPersonalFields = PERSONAL_FIELDS.some(
          (field) => !formik.values[field as keyof typeof formik.values],
        );

        const hasPersonalErrors = PERSONAL_FIELDS.some(
          (field) => formik.errors[field as keyof typeof formik.errors],
        );

        // Check if club experience section is properly filled
        const clubExperienceIncomplete = 
          formik.values.previousExperience === "" || // No selection made
          (formik.values.previousMember === true && !formik.values.previousExperience);

        return !hasEmptyPersonalFields && !hasPersonalErrors && !clubExperienceIncomplete;

      case 2: // Experience
        // Add experience validation logic here
        return true;

      case 3: // Positions
        // Add positions validation logic here
        return true;

      case 4: // Supplementary
        // Add supplementary validation logic here
        return true;

      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (!isStepValid(currentStep)) {
      // Touch all fields to show errors based on current step
      if (currentStep === 1) {
        PERSONAL_FIELDS.forEach((field) => formik.setFieldTouched(field, true));
        
        // Touch club experience fields based on current state
        if (formik.values.previousExperience === "") {
          formik.setFieldTouched("previousMember", true);
        } else if (formik.values.previousMember === true) {
          formik.setFieldTouched("previousExperience", true);
        }
      }
      return;
    }

    // Set previousExperience to NO_PREV_EXPERIENCE if previousMember is false
    if (currentStep === 1 && formik.values.previousMember === false) {
      formik.setFieldValue("previousExperience", NO_PREV_EXPERIENCE);
    }

    await saveSectionAndNext();
  };

  const handlePrevious = () => goToPreviousStep();

  const startApplication = async () => {
    if (!currentTerm) return;
    try {
      if (!hasExistingApplication) {
        await patchApplication({
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
      await patchApplication({
        termApplyingFor: currentTerm.id,
        personalInfo: {
          uwEmail: formik.values.uwEmail,
          personalEmail: formik.values.personalEmail,
          fullName: formik.values.fullName,
        },
        academicInfo: {
          program: formik.values.program,
          academicTerm: formik.values.academicTerm,
          location: formik.values.location,
        },
        clubExperience: {
          previousMember: formik.values.previousMember,
          previousExperience: formik.values.previousExperience,
        },
        questionAnswers: formik.values.questionAnswers,
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
      await patchApplication({
        termApplyingFor: currentTerm.id,
        personalInfo: {
          uwEmail: values.uwEmail,
          personalEmail: values.personalEmail,
          fullName: values.fullName,
        },
        academicInfo: {
          program: values.program,
          academicTerm: values.academicTerm,
          location: values.location,
        },
        clubExperience: {
          previousMember: values.previousMember,
          previousExperience: values.previousExperience,
        },
        questionAnswers: values.questionAnswers,
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
      uwEmail: "",
      personalEmail: "",
      fullName: "",
      program: "",
      academicTerm: "",
      location: "",
      previousMember: false,
      previousExperience: "",
      resumeUrl: "",
      questionAnswers: {},
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
              const previousExperience = application.clubExperience?.previousExperience || "";
              const previousMember = previousExperience === NO_PREV_EXPERIENCE 
                ? false 
                : previousExperience !== "" 
                  ? true 
                  : false;

              formik.setValues({
                ...formik.values,
                uwEmail: application.personalInfo?.uwEmail || "",
                personalEmail: application.personalInfo?.personalEmail || "",
                fullName: application.personalInfo?.fullName || "",
                program: application.academicInfo?.program || "",
                academicTerm: application.academicInfo?.academicTerm || "",
                location: application.academicInfo?.location || "",
                previousMember,
                previousExperience,
                resumeUrl: application.resumeUrl || "",
                questionAnswers: application.questionAnswers || {},
              });
              setHasExistingApplication(true);
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
        return (
          <ApplicationIntro
            onStart={startApplication}
            hasExistingApplication={hasExistingApplication}
          />
        );
      case 1:
        return <PersonalDetails formik={formik} />;
      case 2:
        return (
          <Experience
            formik={formik}
            onNext={saveSectionAndNext}
            onBack={goToPreviousStep}
          />
        );
      case 3:
        return (
          <Positions
            formik={formik}
            questions={currentTerm.questions}
            onNext={saveSectionAndNext}
            onBack={goToPreviousStep}
          />
        );
      case 4:
        return (
          <Supplementary
            formik={formik}
            questions={currentTerm.questions}
            onBack={goToPreviousStep}
            isLoading={isLoading}
            submitError={submitError}
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
      <div className="min-h-screen bg-black px-4 py-20">
        <div className="mx-auto mb-8 max-w-4xl text-center">
          <div className="mb-2 flex justify-center">
            <div className="inline-flex items-center rounded-full border-yellowBorder bg-yellowBackground px-10 py-2 text-xs font-semibold text-yellowText">
              <span className="mr-2 flex items-center">
                <ClockIcon className="h-4 w-4" />
              </span>
              {new Date(currentTerm.appDeadline).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white">
            DSC Exec Application Form
          </h1>
          <p className="text-2xl font-semibold text-lightBlue">
            {currentTerm.termName}
          </p>
        </div>
        {currentStep === 0 || currentStep === 5 ? (
          renderCurrentStep()
        ) : (
          <div className="mx-auto max-w-4xl">
            {/* Progress indicator - CHANGE LATER */}
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between text-sm text-grey1">
                <span
                  className={currentStep >= 1 ? "font-semibold text-white" : ""}
                >
                  Personal Details
                </span>
                <span
                  className={currentStep >= 2 ? "font-semibold text-white" : ""}
                >
                  Experience
                </span>
                <span
                  className={currentStep >= 3 ? "font-semibold text-white" : ""}
                >
                  Positions
                </span>
                <span
                  className={currentStep >= 4 ? "font-semibold text-white" : ""}
                >
                  Supplementary
                </span>
              </div>
              <progress
                value={currentStep}
                max={4}
                className="[&::-webkit-progress-value]:bg-primary [&::-moz-progress-bar]:bg-primary h-2 w-full rounded-full bg-grey4 [&::-moz-progress-bar]:rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-grey4 [&::-webkit-progress-value]:rounded-full"
              />
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="mx-auto max-w-4xl rounded-lg bg-darkBlue pb-4">
                <div className="bg-gradient-blue flex items-center justify-between rounded-t-lg p-4 text-center backdrop-blur-md">
                  <div className="flex items-center justify-center px-2">
                    <CircleUserRound className="mr-3 h-6 w-6 text-white" />
                    <h1 className="text-xl font-bold text-white">
                      {STEP_NAMES[currentStep]}
                    </h1>
                  </div>
                  <p className="text-gray-400 text-sm text-white">
                    Mandatory fields are marked with an asterisk (*)
                  </p>
                </div>
                {renderCurrentStep()}

                {/* Navigation Section */}
                {currentStep >= 1 && currentStep <= 4 && (
                  <div className="mx-6 flex items-center justify-between">
                    <Button
                      type="button"
                      hierarchy="secondary"
                      rounded="rounded-full"
                      onClick={handlePrevious}
                      border="border border-grey1 border-solid"
                      classes="transition-all duration-300 hover:scale-105 hover:shadow-lg bg-transparent hover:text-white hover:bg-grey1"
                    >
                      <div className="flex items-center text-grey1">
                        <MoveLeft className="mr-2 h-4 w-4" />
                        Previous
                      </div>
                    </Button>
                    <div className="flex justify-center space-x-2 py-4">
                      {STEP_NAMES.slice(1).map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
                            index + 1 == currentStep
                              ? "w-8 bg-lightBlue"
                              : index + 1 < currentStep
                              ? "w-2 bg-green"
                              : "w-2 bg-grey1"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-end">
                      <Button
                        type="button"
                        hierarchy="secondary"
                        rounded="rounded-full"
                        onClick={handleNext}
                        disabled={!isStepValid(currentStep)}
                        classes={`transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                          isStepValid(currentStep)
                            ? "bg-white hover:bg-grey1"
                            : "bg-grey1 opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-center text-darkBlue">
                          Next
                          <MoveRight className="ml-2 h-4 w-4" />
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
