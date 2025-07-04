import { FormikProps } from "formik";
import TextInput from "@/components/UI/Inputs/UWDSC/TextInput";
import TextArea from "@/components/UI/Inputs/UWDSC/TextArea";
import Dropdown from "@/components/UI/Dropdown";
import MultipleDropdown from "@/components/UI/Inputs/UWDSC/MultipleDropdown";
import Button from "@/components/UI/Button";
import { ApplicationFormValues, Question } from "@/types/application";

interface PositionsProps {
  formik: FormikProps<ApplicationFormValues>;
  questions: Question[];
  onNext: () => void;
  onBack: () => void;
}

export default function Positions({
  formik,
  questions,
  onNext,
  onBack,
}: PositionsProps) {
  // Filter questions that are position-related (you can customize this logic)
  const positionQuestions = questions.filter(
    (q) =>
      q.question.toLowerCase().includes("position") ||
      q.question.toLowerCase().includes("role") ||
      q.question.toLowerCase().includes("team") ||
      q.question.toLowerCase().includes("leadership"),
  );

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

  // Don't render if no position-related questions
  if (positionQuestions.length === 0) {
    return (
      <div className="space-y-8">
        <div className="rounded-lg bg-grey4 p-6">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Position Preferences
          </h2>
          <p className="text-grey1">
            No position-related questions for this term.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            type="button"
            hierarchy="secondary"
            rounded="rounded-md"
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            type="button"
            hierarchy="primary"
            rounded="rounded-md"
            onClick={onNext}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-grey4 p-6">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Position Preferences
        </h2>

        <div className="space-y-6">
          {positionQuestions.map((question) => (
            <div key={question.id}>
              <label className="mb-2 block text-sm font-medium text-white">
                {question.question} {question.required && "*"}
              </label>
              {renderDynamicQuestion(question)}
              {question.helpText && (
                <p className="mt-1 text-sm text-grey1">{question.helpText}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          type="button"
          hierarchy="secondary"
          rounded="rounded-md"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          type="button"
          hierarchy="primary"
          rounded="rounded-md"
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
