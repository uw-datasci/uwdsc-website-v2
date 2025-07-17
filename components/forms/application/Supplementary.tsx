import { FormikProps } from "formik";
import TextInput from "@/components/UI/Inputs/UWDSC/TextInput";
import InputFeedback from "@/components/UI/Inputs/UWDSC/InputFeedback";
import { ApplicationFormValues, Question } from "@/types/application";
import { HelpCircle, FileText } from "lucide-react";
import RenderDynamicQuestion from "./RenderDynamicQuestions";
import { useEffect, useState } from "react";

interface SupplementaryProps {
  formik: FormikProps<ApplicationFormValues>;
  questions: Question[];
  isNextValid: (valid: boolean) => void;
}

export default function Supplementary({
  formik,
  questions,
  isNextValid,
}: SupplementaryProps) {
  const [supplementaryError, setSupplementaryError] = useState("");

  // Filter for supplementary questions
  const supplementaryQuestions = questions.filter(
    (q) => q.role === "supplementary",
  );

  const isStepValid = () => {
    // Check if resume URL is provided and valid
    if (!formik.values.resumeUrl || formik.errors.resumeUrl) {
      return false;
    }

    // Check if all required supplementary questions are answered
    const requiredQuestions = supplementaryQuestions.filter((q) => q.required);
    const currentSuppplementaryQuestions =
      formik.values.roleQuestionAnswers.supplementary;
    if (!currentSuppplementaryQuestions) {
      setSupplementaryError(
        "Please answer all required supplementary questions.",
      );
      return false;
    }
    if (
      Object.keys(currentSuppplementaryQuestions).length <
      requiredQuestions.length
    ) {
      setSupplementaryError(
        "Please answer all required supplementary questions.",
      );
      return false;
    }
    const validRequired = requiredQuestions.every((question) => {
      const value =
        formik.values.roleQuestionAnswers?.["supplementary"]?.[question.id];
      if (!value) {
        setSupplementaryError(
          "Please answer all required supplementary questions.",
        );
        return false;
      }
      if (question.type === "checkbox") {
        const noCheckboxError = Array.isArray(value) && value.length > 0;
        if (!noCheckboxError) {
          setSupplementaryError(
            "Please select at least one option for all required multi-select questions.",
          );
        }
        return noCheckboxError;
      }
      const noError = value && value.toString().trim() !== "";
      if (!noError) {
        setSupplementaryError(
          "Please answer all required questions for each role selected.",
        );
      }
      return noError;
    });
    if (validRequired) {
      setSupplementaryError("");
    }
    return validRequired;
  };

  useEffect(() => {
    isNextValid(isStepValid());
  }, [formik.values, formik.errors]);

  return (
    <div className="space-y-10">
      {/* Dynamic Questions */}
      {supplementaryQuestions.length > 0 && (
        <div className="rounded-lg border-0.5 border-solid border-white/20 bg-slateBlue p-6">
          <div className="mb-4 flex items-center">
            <HelpCircle className="mr-2 h-5 w-5 text-lighterBlue" />
            <h2 className="text-xl font-semibold text-white">
              Additional Questions
            </h2>
          </div>

          <div className="space-y-6">
            {supplementaryQuestions.map((question, i) => (
              <RenderDynamicQuestion
                key={i}
                formik={formik}
                question={question}
              />
            ))}
          </div>
          {/* dynamic error message if inputs are invalid */}
          {supplementaryError && (
            <InputFeedback classes="mt-7" state="error">
              {supplementaryError}
            </InputFeedback>
          )}
        </div>
      )}

      {/* Resume */}
      <div className="rounded-lg border-0.5 border-solid border-white/20 bg-slateBlue p-6">
        <div className="mb-4 flex items-center">
          <FileText className="mr-2 h-5 w-5 text-lighterBlue" />
          <h2 className="text-xl font-semibold text-white">Resume</h2>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Resume URL <span className="text-red">*</span>
          </label>
          <TextInput
            id="resumeUrl"
            name="resumeUrl"
            type="url"
            placeholder="https://drive.google.com/your-resume"
            value={formik.values.resumeUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            classes="bg-white/10"
          />
          {formik.touched.resumeUrl && formik.errors.resumeUrl && (
            <InputFeedback state="error">
              {formik.errors.resumeUrl}
            </InputFeedback>
          )}
          <p className="mt-1 text-sm text-grey2">
            Please provide a link to your resume (Google Drive, Dropbox, etc.)
          </p>
        </div>
      </div>
    </div>
  );
}
