import { FormikProps } from "formik";
import TextArea from "@/components/UI/Inputs/UWDSC/TextArea";
import Button from "@/components/UI/Button";
import { ApplicationFormValues, Question } from "@/types/application";
import { Crown, Users } from "lucide-react";

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
  // Find position preferences question
  const positionQuestion = questions.find(
    (q) =>
      q.id === "positionPreferences" ||
      (q.question.toLowerCase().includes("position") &&
        q.question.toLowerCase().includes("preference")),
  );

  const isStepValid = () => {
    if (!positionQuestion) return true;

    const value = formik.values.questionAnswers[positionQuestion.id];
    if (positionQuestion.required) {
      return value && value.toString().trim() !== "";
    }
    return true;
  };

  const handleNext = () => {
    if (!isStepValid() && positionQuestion) {
      formik.setFieldTouched(`questionAnswers.${positionQuestion.id}`, true);
      return;
    }
    onNext();
  };

  const positionPreferencesPlaceholder = `List your preferred positions in order of preference. For example:
1. Vice President of Education
2. Education Team Lead
3. Workshop Coordinator
Remember: There is no upper limit on the number of positions you can indicate interest for.`;

  return (
    <div className="space-y-8">
      {/* VP Role Consideration Banner */}
      <div className="flex gap-4 rounded-lg border border-solid border-orange/50 bg-orange/30 p-4">
        <div className="mx-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orangeText/20">
          <Crown className="h-4 w-4 text-orangeText" />
        </div>

        <div className="flex-1">
          <p className="font-semibold text-orangeText">
            VP Role Consideration:
          </p>
          <p className="text-sm text-orange">
            If you are applying for a VP Role, we will also consider you for an
            exec role in the same sub-team. Make sure to clearly indicate your
            preferences!
          </p>
        </div>
      </div>

      {/* Position Preferences Card */}
      <div className="rounded-lg border-0.5 border-solid border-white/20 bg-slateBlue p-6">
        <div className="mb-4 flex items-center">
          <Users className="mr-2 h-5 w-5 text-lighterBlue" />
          <h2 className="text-xl font-semibold text-white">
            Position Preferences
          </h2>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-white">
            Which positions are you interested in?{" "}
            <span className="text-red">*</span>
          </label>
          <p className="mb-3 text-sm text-grey2">
            Please list (and number) in order of preference, with 1 being the
            position you are most interested in.
          </p>
          <TextArea
            id={positionQuestion?.id || "positionPreferences"}
            name={`questionAnswers.${
              positionQuestion?.id || "positionPreferences"
            }`}
            placeholder={positionPreferencesPlaceholder}
            value={
              formik.values.questionAnswers[
                positionQuestion?.id || "positionPreferences"
              ] || ""
            }
            onChange={(e) =>
              formik.setFieldValue(
                `questionAnswers.${
                  positionQuestion?.id || "positionPreferences"
                }`,
                e.target.value,
              )
            }
            onBlur={formik.handleBlur}
            rows={8}
            background="bg-white/10"
          />
        </div>
      </div>
    </div>
  );
}
