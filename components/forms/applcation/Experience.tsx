import { FormikProps } from "formik";
import Checkbox from "@/components/UI/Inputs/UWDSC/Checkbox";
import TextArea from "@/components/UI/Inputs/UWDSC/TextArea";
import Button from "@/components/UI/Button";
import { ApplicationFormValues } from "@/types/application";

interface ExperienceProps {
  formik: FormikProps<ApplicationFormValues>;
  onNext: () => void;
  onBack: () => void;
}

export default function Experience({
  formik,
  onNext,
  onBack,
}: ExperienceProps) {
  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-grey4 p-6">
        <h2 className="mb-6 text-2xl font-bold text-white">Club Experience</h2>

        <div className="mb-6">
          <Checkbox
            id="previousMember"
            name="previousMember"
            checkboxString="I was a previous member of UW Data Science Club"
            value={formik.values.previousMember}
            onChange={formik.handleChange}
          />
        </div>

        {formik.values.previousMember && (
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Previous Experience
            </label>
            <TextArea
              id="previousExperience"
              name="previousExperience"
              placeholder="Tell us about your previous experience with the club..."
              value={formik.values.previousExperience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={4}
            />
          </div>
        )}
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
