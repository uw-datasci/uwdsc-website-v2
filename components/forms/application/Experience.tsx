import { FormikProps } from "formik";
import Checkbox from "@/components/UI/Inputs/UWDSC/Checkbox";
import TextArea from "@/components/UI/Inputs/UWDSC/TextArea";
import Button from "@/components/UI/Button";
import { ApplicationFormValues, Question } from "@/types/application";
import { Briefcase, Heart, User } from "lucide-react";

interface ExperienceProps {
  formik: FormikProps<ApplicationFormValues>;
  questions: Question[];
}

export default function Experience({ formik, questions }: ExperienceProps) {
  // Find skills and motivation questions
  const skillsQuestion = questions.find(
    (q) =>
      q.id === "skills" ||
      (q.question.toLowerCase().includes("skill") &&
        q.question.toLowerCase().includes("experience")),
  );

  const motivationQuestion = questions.find(
    (q) =>
      q.id === "motivation" ||
      q.question.toLowerCase().includes("motivation") ||
      (q.question.toLowerCase().includes("why") &&
        q.question.toLowerCase().includes("join")),
  );

  const skillsPlaceholder = `Describe your relevant skills and experiences for the positions you're interested in. Include specific examples of:
  • Leadership experience
  • Technical skills
  • Project management
  • Communication abilities
  • Team collaboration
  • Any other relevant experiences`;

  const motivationPlaceholder = `Share your motivation for joining the Data Science Club. Consider mentioning:
  • What interests you about data science
  • How you want to contribute to the community
  • What you hope to achieve as an executive
  • Your vision for the club`;

  return (
    <div className="space-y-8">
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

      {/* Skills & Experience Card */}
      <div className="rounded-lg border-0.5 border-solid border-white/20 bg-slateBlue p-6">
        <div className="mb-4 flex items-center">
          <Briefcase className="mr-2 h-5 w-5 text-lighterBlue" />
          <h2 className="text-xl font-semibold text-white">
            Skills & Experience
          </h2>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-white">
            What skills make you an ideal candidate for each position you are
            interested in? <span className="text-red">*</span>
          </label>
          <p className="mb-3 text-sm text-grey2">
            Please give examples of how your past experiences could be used as
            an executive.
          </p>
          <TextArea
            id={skillsQuestion?.id || "skills"}
            name={`questionAnswers.${skillsQuestion?.id || "skills"}`}
            placeholder={skillsPlaceholder}
            value={
              formik.values.questionAnswers[skillsQuestion?.id || "skills"] ||
              ""
            }
            onChange={(e) =>
              formik.setFieldValue(
                `questionAnswers.${skillsQuestion?.id || "skills"}`,
                e.target.value,
              )
            }
            onBlur={formik.handleBlur}
            rows={8}
            background="bg-white/10"
          />
        </div>
      </div>

      {/* Motivation Card */}
      <div className="rounded-lg border-0.5 border-solid border-white/20 bg-slateBlue p-6">
        <div className="mb-4 flex items-center">
          <Heart className="mr-2 h-5 w-5 text-lighterBlue" />
          <h2 className="text-xl font-bold text-white">Motivation</h2>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-white">
            Why do you want to join DSC? <span className="text-red">*</span>
          </label>
          <TextArea
            id={motivationQuestion?.id || "motivation"}
            name={`questionAnswers.${motivationQuestion?.id || "motivation"}`}
            placeholder={motivationPlaceholder}
            value={
              formik.values.questionAnswers[
                motivationQuestion?.id || "motivation"
              ] || ""
            }
            onChange={(e) =>
              formik.setFieldValue(
                `questionAnswers.${motivationQuestion?.id || "motivation"}`,
                e.target.value,
              )
            }
            onBlur={formik.handleBlur}
            rows={6}
            background="bg-white/10"
          />
        </div>
      </div>
    </div>
  );
}
