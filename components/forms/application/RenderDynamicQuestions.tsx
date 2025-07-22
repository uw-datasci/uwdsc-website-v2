import Dropdown from "@/components/UI/Dropdown";
import InputFeedback from "@/components/UI/Inputs/UWDSC/InputFeedback";
import MultipleDropdown from "@/components/UI/Inputs/UWDSC/MultipleDropdown";
import TextArea from "@/components/UI/Inputs/UWDSC/TextArea";
import TextInput from "@/components/UI/TextInput";
import { ApplicationFormValues, Question } from "@/types/application";
import { FormikProps } from "formik";

interface DynamicQuestionProps {
  formik: FormikProps<ApplicationFormValues>;
  question: Question;
  onInteract?: () => void;
  allQuestions?: Question[]; // Add this to access all questions for filtering
}
export default function RenderDynamicQuestion({
  formik,
  question,
  onInteract,
  allQuestions = [],
}: DynamicQuestionProps) {
  const value =
    formik.values.roleQuestionAnswers[question.role]?.[question.id] || "";

  const handleQuestionChange = (value: any) => {
    if (onInteract) {
      onInteract();
    }
    formik.setFieldValue(
      `roleQuestionAnswers.${question.role}.${question.id}`,
      value,
    );
  };

  // Helper function to check if question should be rendered based on Events VP/Exec logic
  const shouldRenderQuestion = () => {
    // Check if this is an Events VP or Events Exec option A/B question
    const isEventsVPOptionA = question.id === "Events VP_q4a";
    const isEventsVPOptionB = question.id === "Events VP_q4b";
    const isEventsExecOptionA = question.id === "Events Exec_q3a";
    const isEventsExecOptionB = question.id === "Events Exec_q3b";

    if (isEventsVPOptionA || isEventsVPOptionB) {
      const selectedOption =
        formik.values.roleQuestionAnswers["Events VP"]?.["Events VP_q3"];
      if (isEventsVPOptionA) {
        return selectedOption === "Option A - Leadership Experience Question";
      }
      if (isEventsVPOptionB) {
        return (
          selectedOption === "Option B - Event Planning Experience Question"
        );
      }
    }

    if (isEventsExecOptionA || isEventsExecOptionB) {
      const selectedOption =
        formik.values.roleQuestionAnswers["Events Exec"]?.["Events Exec_q2"];
      if (isEventsExecOptionA) {
        return selectedOption === "Option A - Leadership Experience Question";
      }
      if (isEventsExecOptionB) {
        return (
          selectedOption === "Option B - Event Planning Experience Question"
        );
      }
    }

    return true; // Render all other questions normally
  };

  // Helper function to get filtered options for Events VP/Exec multiple choice questions
  const getFilteredOptions = () => {
    const selectedRoles = formik.values.rolesApplyingFor || [];
    const isEventsVPMultipleChoice = question.id === "Events VP_q3";
    const isEventsExecMultipleChoice = question.id === "Events Exec_q2";

    if (!isEventsVPMultipleChoice && !isEventsExecMultipleChoice) {
      return question.options || [];
    }

    // Check if both Events VP and Events Exec are selected
    const hasEventsVP = selectedRoles.includes("Events VP");
    const hasEventsExec = selectedRoles.includes("Events Exec");

    if (!hasEventsVP || !hasEventsExec) {
      return question.options || []; // No filtering needed if only one role is selected
    }

    // Get the other role's selection
    if (isEventsVPMultipleChoice) {
      const eventsExecSelection =
        formik.values.roleQuestionAnswers["Events Exec"]?.["Events Exec_q2"];
      if (eventsExecSelection === "Option A - Leadership Experience Question") {
        return ["Option B - Event Planning Experience Question"];
      } else if (
        eventsExecSelection === "Option B - Event Planning Experience Question"
      ) {
        return ["Option A - Leadership Experience Question"];
      }
    }

    if (isEventsExecMultipleChoice) {
      const eventsVPSelection =
        formik.values.roleQuestionAnswers["Events VP"]?.["Events VP_q3"];
      if (eventsVPSelection === "Option A - Leadership Experience Question") {
        return ["Option B - Event Planning Experience Question"];
      } else if (
        eventsVPSelection === "Option B - Event Planning Experience Question"
      ) {
        return ["Option A - Leadership Experience Question"];
      }
    }

    return question.options || [];
  };

  // Don't render if this question should be conditionally hidden
  if (!shouldRenderQuestion()) {
    return null;
  }

  switch (question.type) {
    case "text":
      return (
        <div className="mb-4">
          <p className="mb-2 block text-md text-white">
            {question.question}{" "}
            {question.required && <span className="text-red">*</span>}
          </p>
          <p className="mb-3 text-sm text-grey2">{question.helpText}</p>
          <TextInput
            id={`${question.id.replace(/\s+/g, "-")}-${question.role.replace(
              /\s+/g,
              "-",
            )}`}
            name={`roleQuestionAnswers.${question.role}.${question.id}`}
            type="text"
            placeholder={question.placeholder || ""}
            value={String(value)}
            onChange={(e) => handleQuestionChange(e.target.value)}
            onBlur={formik.handleBlur}
            classes="bg-white/10"
          />
          {formik.touched.roleQuestionAnswers?.[question.role]?.[question.id] &&
            formik.errors.roleQuestionAnswers?.[question.role]?.[
              question.id
            ] && (
              <InputFeedback classes="px-2 pt-1 leading-relaxed" state="error">
                {
                  formik.errors.roleQuestionAnswers?.[question.role]?.[
                    question.id
                  ]
                }
              </InputFeedback>
            )}
        </div>
      );

    case "textarea":
      return (
        <div className="mb-4">
          <p className="mb-2 block text-md text-white">
            {question.question}{" "}
            {question.required && <span className="text-red">*</span>}
          </p>
          <p className="mb-3 text-sm text-grey2">{question.helpText}</p>
          <TextArea
            id={`${question.id.replace(/\s+/g, "-")}-${question.role.replace(
              /\s+/g,
              "-",
            )}`}
            name={`roleQuestionAnswers.${question.role}.${question.id}`}
            placeholder={question.placeholder || ""}
            value={String(value)}
            onChange={(e) => handleQuestionChange(e.target.value)}
            onBlur={formik.handleBlur}
            rows={4}
            background="bg-white/10"
          />
          {formik.touched.roleQuestionAnswers?.[question.role]?.[question.id] &&
            formik.errors.roleQuestionAnswers?.[question.role]?.[
              question.id
            ] && (
              <InputFeedback classes="px-2 pt-1 leading-relaxed" state="error">
                {
                  formik.errors.roleQuestionAnswers?.[question.role]?.[
                    question.id
                  ]
                }
              </InputFeedback>
            )}
        </div>
      );

    case "multiple_choice":
      const filteredOptions = getFilteredOptions();
      return (
        <div className="mb-4">
          <p className="mb-2 block text-md text-white">
            {question.question}{" "}
            {question.required && <span className="text-red">*</span>}
          </p>
          <p className="mb-3 text-sm text-grey2">{question.helpText}</p>
          <Dropdown
            id={`${question.id.replace(/\s+/g, "-")}-${question.role.replace(
              /\s+/g,
              "-",
            )}`}
            name={`roleQuestionAnswers.${question.role}.${question.id}`}
            placeholder={question.placeholder || "Select an option"}
            options={filteredOptions}
            value={String(value)}
            onChange={(e) => handleQuestionChange(e.target.value)}
            background="bg-white/10"
          />
        </div>
      );

    case "checkbox":
      return (
        <div className="mb-4">
          <p className="mb-2 block text-md text-white">
            {question.question}{" "}
            {question.required && <span className="text-red">*</span>}
          </p>
          <p className="mb-3 text-sm text-grey2">{question.helpText}</p>
          <MultipleDropdown
            id={`${question.id.replace(/\s+/g, "-")}-${question.role.replace(
              /\s+/g,
              "-",
            )}`}
            name={`roleQuestionAnswers.${question.role}.${question.id}`}
            placeholder={question.placeholder || "Select options"}
            options={question.options || []}
            value={Array.isArray(value) ? value : []}
            execAppOnChange={handleQuestionChange}
            maxSelection={question.options?.length || 10}
            background="bg-white/10 backdrop-blur-lg"
          />
        </div>
      );

    default:
      return null;
  }
}
