import { FormikProps } from "formik";
import { ApplicationFormValues, Question } from "@/types/application";
import { User } from "lucide-react";
import RenderDynamicQuestion from "./RenderDynamicQuestions";

interface GeneralProps {
  formik: FormikProps<ApplicationFormValues>;
  questions: Question[];
}

export default function General({ formik, questions }: GeneralProps) {
  // Filter questions for the "general" role and sort by order
  const generalQuestions = questions
    .filter((q) => q.role === "general")
    .sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-10">
      {/* Tip Banner */}
      <div className="flex gap-4 rounded-lg border border-solid border-aqua/50 bg-aqua/30 p-4">
        <div className="mx-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-aquaTextPrimary/20">
          <User className="h-4 w-4 text-aquaTextPrimary" />
        </div>

        <div className="flex-1">
          <p className="font-semibold text-aquaTextPrimary">Tip:</p>
          <p className="text-sm text-aquaTextSecondary">
            Be specific about your experiences and connect them directly to the
            positions you&apos;re applying for.
            <br />
            Show how your unique background will benefit DSC!
          </p>
        </div>
      </div>

      {/* Dynamic General Questions */}
      <div className="rounded-lg border-0.5 border-solid border-white/20 bg-slateBlue p-6">
        <div className="space-y-6">
          {generalQuestions.map((question) => (
            <RenderDynamicQuestion
              key={question.id}
              formik={formik}
              question={question}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
