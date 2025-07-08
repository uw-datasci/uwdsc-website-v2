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
import InputFeedback from "@/components/UI/Inputs/UWDSC/InputFeedback";
import Button from "@/components/UI/Button";

// Types
import { ApplicationFormValues, Term } from "@/types/application";

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

  // Step navigation functions
  const goToNextStep = () => setCurrentStep((prev) => prev + 1);
  const goToPreviousStep = () => setCurrentStep((prev) => prev - 1);

  const startApplication = async () => {
    if (!currentTerm) return;
    try {
      await patchApplication({
        termApplyingFor: currentTerm.id,
        personalInfo: {
          uwEmail: "",
          personalEmail: "",
          fullName: "",
        },
        academicInfo: {
          program: "",
          academicTerm: "",
          location: "",
        },
        clubExperience: {
          previousMember: false,
          previousExperience: "",
        },
        questionAnswers: {},
        resumeUrl: "",
        status: "draft",
      });
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
      setSubmitError(
        error.response?.data?.error || "Failed to submit application",
      );
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
              formik.setValues({
                ...formik.values,
                uwEmail: application.personalInfo?.uwEmail || "",
                personalEmail: application.personalInfo?.personalEmail || "",
                fullName: application.personalInfo?.fullName || "",
                program: application.academicInfo?.program || "",
                academicTerm: application.academicInfo?.academicTerm || "",
                location: application.academicInfo?.location || "",
                previousMember:
                  application.clubExperience?.previousMember || false,
                previousExperience:
                  application.clubExperience?.previousExperience || "",
                resumeUrl: application.resumeUrl || "",
                questionAnswers: application.questionAnswers || {},
              });
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
            currentTerm={currentTerm}
            onStart={startApplication}
          />
        );
      case 1:
        return <PersonalDetails formik={formik} onNext={saveSectionAndNext} />;
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

  return (
    <>
      <SEO title="Apply to DSC" />
      <div className="min-h-screen bg-black px-4 py-20">
        {currentStep === 0 || currentStep === 5 ? (
          renderCurrentStep()
        ) : (
          <div className="mx-auto max-w-4xl">
            {/* Progress indicator */}
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

            <form onSubmit={formik.handleSubmit}>{renderCurrentStep()}</form>
          </div>
        )}
      </div>
    </>
  );
}
