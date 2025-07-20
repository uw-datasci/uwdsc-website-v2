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
}
export default function RenderDynamicQuestion({
  formik,
  question,
}: DynamicQuestionProps) {
  const value =
    formik.values.roleQuestionAnswers[question.role]?.[question.id] || "";

  const handleQuestionChange = (value: any) => {
    formik.setFieldValue(
      `roleQuestionAnswers.${question.role}.${question.id}`,
      value,
    );
  };

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
            id={`${question.id.replace(/\s+/g, "-")}-${question.role.replace(/\s+/g, "-")}`}
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
            id={`${question.id.replace(/\s+/g, "-")}-${question.role.replace(/\s+/g, "-")}`}
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
      return (
        <div className="mb-4">
          <p className="mb-2 block text-md text-white">
            {question.question}{" "}
            {question.required && <span className="text-red">*</span>}
          </p>
          <p className="mb-3 text-sm text-grey2">{question.helpText}</p>
          <Dropdown
            id={`${question.id.replace(/\s+/g, "-")}-${question.role.replace(/\s+/g, "-")}`}
            name={`roleQuestionAnswers.${question.role}.${question.id}`}
            placeholder={question.placeholder || "Select an option"}
            options={question.options || []}
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
            id={`${question.id.replace(/\s+/g, "-")}-${question.role.replace(/\s+/g, "-")}`}
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
