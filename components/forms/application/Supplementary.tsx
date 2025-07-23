import { FormikProps } from "formik";
import TextInput from "@/components/UI/Inputs/UWDSC/TextInput";
import InputFeedback from "@/components/UI/Inputs/UWDSC/InputFeedback";
import { ApplicationFormValues } from "@/types/application";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";

interface SupplementaryProps {
  formik: FormikProps<ApplicationFormValues>;
  isNextValid: (valid: boolean) => void;
}

export default function Supplementary({
  formik,
  isNextValid,
}: SupplementaryProps) {
  const [formTouched, setFormTouched] = useState(false);

  const isStepValid = () => {
    // Check if resume URL is provided and valid
    return !!(formik.values.resumeUrl && !formik.errors.resumeUrl);
  };

  useEffect(() => {
    // Check if form already has values (e.g., if user is returning to this step)
    const hasResumeUrl =
      formik.values.resumeUrl && formik.values.resumeUrl.trim() !== "";

    if (formTouched || hasResumeUrl) {
      isNextValid(isStepValid());
    } else {
      // Initially disable next button without showing an error
      isNextValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values, formik.errors, formTouched]);

  // Mark the form as touched when user interacts with any field
  const handleFieldInteraction = () => {
    if (!formTouched) {
      setFormTouched(true);
    }
  };

  return (
    <div className="space-y-10">
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
            onChange={(e) => {
              handleFieldInteraction();
              formik.handleChange(e);
            }}
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
