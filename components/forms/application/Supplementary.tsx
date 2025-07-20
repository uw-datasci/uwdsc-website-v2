import { FormikProps } from "formik";
import TextInput from "@/components/UI/Inputs/UWDSC/TextInput";
import TextArea from "@/components/UI/Inputs/UWDSC/TextArea";
import Dropdown from "@/components/UI/Dropdown";
import MultipleDropdown from "@/components/UI/Inputs/UWDSC/MultipleDropdown";
import InputFeedback from "@/components/UI/Inputs/UWDSC/InputFeedback";
import Button from "@/components/UI/Button";
import { ApplicationFormValues, Question } from "@/types/application";
import { HelpCircle, FileText } from "lucide-react";

interface SupplementaryProps {
  formik: FormikProps<ApplicationFormValues>;
  questions: Question[];
  onBack: () => void;
  isLoading: boolean;
  submitError: string;
}

export default function Supplementary({
  formik,
  questions,
  onBack,
  isLoading,
  submitError,
}: SupplementaryProps) {
  // Filter out position-related questions (show all other questions)
  const supplementaryQuestions = questions.filter(
    (q) =>
      !q.question.toLowerCase().includes("position") &&
      !q.question.toLowerCase().includes("role") &&
      !q.question.toLowerCase().includes("team") &&
      !q.question.toLowerCase().includes("leadership"),
  );

  const isStepValid = () => {
    // Check if resume URL is provided and valid
    if (!formik.values.resumeUrl || formik.errors.resumeUrl) {
      return false;
    }

    // Check if all required supplementary questions are answered
    const requiredQuestions = supplementaryQuestions.filter((q) => q.required);

    return requiredQuestions.every((question) => {
      const value = formik.values.questionAnswers[question.id];
      if (question.type === "checkbox") {
        return Array.isArray(value) && value.length > 0;
      }
      return value && value.toString().trim() !== "";
    });
  };

  const renderDynamicQuestion = (question: Question) => {
    const value = formik.values.questionAnswers[question.id] || "";

    const handleQuestionChange = (value: any) => {
      formik.setFieldValue(`questionAnswers.${question.id}`, value);
    };

    switch (question.type) {
      case "text":
        return (
          <TextInput
            key={question.id}
            id={question.id}
            name={`questionAnswers.${question.id}`}
            type="text"
            placeholder={question.placeholder || ""}
            value={value}
            onChange={(e) => handleQuestionChange(e.target.value)}
            onBlur={formik.handleBlur}
            classes="bg-white/10"
          />
        );

      case "textarea":
        return (
          <TextArea
            key={question.id}
            id={question.id}
            name={`questionAnswers.${question.id}`}
            placeholder={question.placeholder || ""}
            value={value}
            onChange={(e) => handleQuestionChange(e.target.value)}
            onBlur={formik.handleBlur}
            rows={4}
            background="bg-white/10"
          />
        );

      case "multiple_choice":
        return (
          <Dropdown
            key={question.id}
            id={question.id}
            name={`questionAnswers.${question.id}`}
            placeholder={question.placeholder || "Select an option"}
            options={question.options || []}
            value={value}
            onChange={(e) => handleQuestionChange(e.target.value)}
            background="bg-white/10"
          />
        );

      case "checkbox":
        return (
          <MultipleDropdown
            key={question.id}
            id={question.id}
            name={`questionAnswers.${question.id}`}
            placeholder={question.placeholder || "Select options"}
            options={question.options || []}
            value={Array.isArray(value) ? value : []}
            onChange={(e) => handleQuestionChange(e.target.value)}
            maxSelection={question.options?.length || 10}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
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
            {supplementaryQuestions.map((question) => (
              <div key={question.id}>
                <label className="mb-2 block text-sm font-medium text-white">
                  {question.question}{" "}
                  {question.required && <span className="text-red">*</span>}
                </label>
                {renderDynamicQuestion(question)}
                {question.helpText && (
                  <p className="mt-1 text-sm text-grey2">{question.helpText}</p>
                )}
              </div>
            ))}
          </div>
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
