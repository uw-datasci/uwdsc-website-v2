import { FormikProps } from "formik";
import TextInput from "@/components/UI/Inputs/UWDSC/TextInput";
import Dropdown from "@/components/UI/Dropdown";
import InputFeedback from "@/components/UI/Inputs/UWDSC/InputFeedback";
import Button from "@/components/UI/Button";
import { ApplicationFormValues } from "@/types/application";

interface PersonalDetailsProps {
  formik: FormikProps<ApplicationFormValues>;
  onNext: () => void;
}

const locationOptions = [
  "Study Term",
  "Co-op Term in Waterloo",
  "Co-op Term but can commute to Waterloo",
  "Co-op term not in Waterloo",
];

export default function PersonalDetails({
  formik,
  onNext,
}: PersonalDetailsProps) {
  const handleNext = () => {
    // Validate current step fields
    const personalFields = [
      "uwEmail",
      "personalEmail",
      "fullName",
      "program",
      "academicTerm",
      "location",
    ];
    const hasErrors = personalFields.some(
      (field) => formik.errors[field as keyof typeof formik.errors],
    );
    const hasEmptyFields = personalFields.some(
      (field) => !formik.values[field as keyof typeof formik.values],
    );

    if (hasErrors || hasEmptyFields) {
      // Touch all fields to show errors
      personalFields.forEach((field) => {
        formik.setFieldTouched(field, true);
      });
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <div className="rounded-lg bg-grey4 p-6">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              UW Email *
            </label>
            <TextInput
              id="uwEmail"
              name="uwEmail"
              type="email"
              placeholder="yourname@uwaterloo.ca"
              value={formik.values.uwEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.uwEmail && formik.errors.uwEmail && (
              <InputFeedback state="error">
                {formik.errors.uwEmail}
              </InputFeedback>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Personal Email *
            </label>
            <TextInput
              id="personalEmail"
              name="personalEmail"
              type="email"
              placeholder="yourname@gmail.com"
              value={formik.values.personalEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.personalEmail && formik.errors.personalEmail && (
              <InputFeedback state="error">
                {formik.errors.personalEmail}
              </InputFeedback>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-white">
            Full Name *
          </label>
          <TextInput
            id="fullName"
            name="fullName"
            type="text"
            placeholder="John Doe"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <InputFeedback state="error">
              {formik.errors.fullName}
            </InputFeedback>
          )}
        </div>
      </div>

      {/* Academic Information */}
      <div className="rounded-lg bg-grey4 p-6">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Academic Information
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Program *
            </label>
            <TextInput
              id="program"
              name="program"
              type="text"
              placeholder="Computer Science"
              value={formik.values.program}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.program && formik.errors.program && (
              <InputFeedback state="error">
                {formik.errors.program}
              </InputFeedback>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Academic Term *
            </label>
            <TextInput
              id="academicTerm"
              name="academicTerm"
              type="text"
              placeholder="2A"
              value={formik.values.academicTerm}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.academicTerm && formik.errors.academicTerm && (
              <InputFeedback state="error">
                {formik.errors.academicTerm}
              </InputFeedback>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-white">
            Location Status *
          </label>
          <Dropdown
            id="location"
            name="location"
            placeholder="Select your location status"
            options={locationOptions}
            value={formik.values.location}
            onChange={formik.handleChange}
          />
          {formik.touched.location && formik.errors.location && (
            <InputFeedback state="error">
              {formik.errors.location}
            </InputFeedback>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end">
        <Button
          type="button"
          hierarchy="primary"
          rounded="rounded-md"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
