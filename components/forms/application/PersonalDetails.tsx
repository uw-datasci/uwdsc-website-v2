import { FormikProps } from "formik";
import TextInput from "@/components/UI/Inputs/UWDSC/TextInput";
import Dropdown from "@/components/UI/Dropdown";
import InputFeedback from "@/components/UI/Inputs/UWDSC/InputFeedback";
import { ApplicationFormValues, Question } from "@/types/application";
import { User, GraduationCap } from "lucide-react";

interface PersonalDetailsProps {
  formik: FormikProps<ApplicationFormValues>;
  questions: Question[];
}

const locationOptions = [
  "Study Term",
  "Co-op Term in Waterloo",
  "Co-op Term but can commute to Waterloo",
  "Co-op term not in Waterloo",
];

const terms = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B"];

export default function PersonalDetails({
  formik,
  questions,
}: PersonalDetailsProps) {
  const generalAnswers = formik.values.roleQuestionAnswers.general || {};

  const getValue = (field: string) => {
    if (field === "club_experience") {
      return generalAnswers[field as keyof typeof generalAnswers];
    }
    return generalAnswers[field as keyof typeof generalAnswers] || "";
  };

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      formik.setFieldValue(
        `roleQuestionAnswers.general.${field}`,
        e.target.value,
      );

  return (
    <>
      {/* Main Content Grid */}
      <div className="mb-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Basic Information */}
        <div className="rounded-lg border-0.5 border-solid border-white/20 bg-slateBlue p-6">
          <div className="mb-6 flex items-center">
            <User className="mr-2 h-5 w-5 text-lighterBlue" />
            <h2 className="text-xl font-semibold text-white">
              Basic Information
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Full Name <span className="text-red">*</span>
              </label>
              <TextInput
                id="roleQuestionAnswers.general.full_name"
                name="roleQuestionAnswers.general.full_name"
                type="text"
                placeholder="Enter your full name"
                value={String(getValue("full_name"))}
                onChange={handleChange("full_name")}
                onBlur={formik.handleBlur}
                classes="bg-white/10"
              />
              {formik.touched.roleQuestionAnswers?.general?.full_name &&
                formik.errors.roleQuestionAnswers?.general?.full_name && (
                  <InputFeedback
                    classes="px-2 pt-1 leading-relaxed"
                    state="error"
                  >
                    {formik.errors.roleQuestionAnswers?.general?.full_name}
                  </InputFeedback>
                )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Personal Email Address <span className="text-red">*</span>
              </label>
              <TextInput
                id="roleQuestionAnswers.general.personal_email"
                name="roleQuestionAnswers.general.personal_email"
                type="email"
                placeholder="someone@example.com"
                value={String(getValue("personal_email"))}
                onChange={handleChange("personal_email")}
                onBlur={formik.handleBlur}
                classes="bg-white/10"
              />
              {formik.touched.roleQuestionAnswers?.general?.personal_email &&
                formik.errors.roleQuestionAnswers?.general?.personal_email && (
                  <InputFeedback
                    classes="px-2 pt-1 leading-relaxed"
                    state="error"
                  >
                    {formik.errors.roleQuestionAnswers?.general?.personal_email}
                  </InputFeedback>
                )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                UW Email Address <span className="text-red">*</span>
              </label>
              <TextInput
                id="roleQuestionAnswers.general.waterloo_email"
                name="roleQuestionAnswers.general.waterloo_email"
                type="email"
                placeholder="someone@uwaterloo.ca"
                value={String(getValue("waterloo_email"))}
                onChange={handleChange("waterloo_email")}
                onBlur={formik.handleBlur}
                classes="bg-white/10"
              />
              {formik.touched.roleQuestionAnswers?.general?.waterloo_email &&
                formik.errors.roleQuestionAnswers?.general?.waterloo_email && (
                  <InputFeedback
                    classes="px-2 pt-1 leading-relaxed"
                    state="error"
                  >
                    {formik.errors.roleQuestionAnswers?.general?.waterloo_email}
                  </InputFeedback>
                )}
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="rounded-lg border-0.5 border-solid border-white/20 bg-slateBlue p-6">
          <div className="mb-6 flex items-center">
            <GraduationCap className="mr-2 h-5 w-5 text-lighterBlue" />
            <h2 className="text-xl font-semibold text-white">
              Academic Information
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Program <span className="text-red">*</span>
              </label>
              <TextInput
                id="roleQuestionAnswers.general.program"
                name="roleQuestionAnswers.general.program"
                type="text"
                placeholder="Computer Science"
                value={String(getValue("program"))}
                onChange={handleChange("program")}
                onBlur={formik.handleBlur}
                classes="bg-white/10"
              />
              {formik.touched.roleQuestionAnswers?.general?.program &&
                formik.errors.roleQuestionAnswers?.general?.program && (
                  <InputFeedback
                    classes="px-2 pt-1 leading-relaxed"
                    state="error"
                  >
                    {formik.errors.roleQuestionAnswers?.general?.program}
                  </InputFeedback>
                )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Academic Term (Current or Most Recent)
                <span className="text-red">*</span>
              </label>
              <Dropdown
                id="academic_term"
                name="academic_term"
                placeholder="Select your academic term"
                options={
                  questions.find((q) => q.id === "academic_term")?.options ||
                  terms
                }
                value={String(getValue("academic_term"))}
                onChange={handleChange("academic_term")}
                background="bg-white/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Location Next Term <span className="text-red">*</span>
              </label>
              <Dropdown
                id="location"
                name="location"
                placeholder="Select where you will be next term"
                options={
                  questions.find((q) => q.id === "location")?.options ||
                  locationOptions
                }
                value={String(getValue("location"))}
                onChange={handleChange("location")}
                background="bg-white/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Club Experience */}
      <div className="rounded-lg border-0.5 border-solid border-white/20 bg-slateBlue p-6">
        <h2 className="mb-6 text-xl font-semibold text-white">
          Club Experience
        </h2>

        <div className="space-y-4">
          <div>
            <label className="mb-3 block text-sm font-medium text-white">
              Have you been a member of the UW Data Science Club before?{" "}
              <span className="text-red">*</span>
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="roleQuestionAnswers.general.club_experience"
                  value="true"
                  checked={getValue("club_experience") === true}
                  onChange={() => {
                    formik.setFieldValue(
                      "roleQuestionAnswers.general.club_experience",
                      true,
                    );
                  }}
                  className="mr-2 h-4 w-4 border-grey2 bg-grey3 text-lightBlue focus:ring-lightBlue"
                />
                <span className="text-white">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="roleQuestionAnswers.general.club_experience"
                  value="false"
                  checked={getValue("club_experience") === false}
                  onChange={() => {
                    formik.setFieldValue(
                      "roleQuestionAnswers.general.club_experience",
                      false,
                    );
                  }}
                  className="mr-2 h-4 w-4 border-grey2 bg-grey3 text-lightBlue focus:ring-lightBlue"
                />
                <span className="text-white">No</span>
              </label>
            </div>
            {formik.touched.roleQuestionAnswers?.general?.club_experience &&
              formik.errors.roleQuestionAnswers?.general?.club_experience && (
                <InputFeedback
                  classes="px-2 pt-1 leading-relaxed"
                  state="error"
                >
                  {formik.errors.roleQuestionAnswers?.general?.club_experience}
                </InputFeedback>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
