import { FormikProps } from "formik";
import TextInput from "@/components/UI/Inputs/UWDSC/TextInput";
import Dropdown from "@/components/UI/Dropdown";
import InputFeedback from "@/components/UI/Inputs/UWDSC/InputFeedback";
import TextArea from "@/components/UI/Inputs/UWDSC/TextArea";
import { ApplicationFormValues } from "@/types/application";
import { User, GraduationCap } from "lucide-react";

interface PersonalDetailsProps {
  formik: FormikProps<ApplicationFormValues>;
}

const locationOptions = [
  "Study Term",
  "Co-op Term in Waterloo",
  "Co-op Term but can commute to Waterloo",
  "Co-op term not in Waterloo",
];

const terms = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B"];

export default function PersonalDetails({ formik }: PersonalDetailsProps) {
  return (
    <>
      {/* Main Content Grid */}
      <div className="m-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
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
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                classes="bg-white/10"
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <InputFeedback state="error">
                  {formik.errors.fullName}
                </InputFeedback>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Personal Email Address <span className="text-red">*</span>
              </label>
              <TextInput
                id="personalEmail"
                name="personalEmail"
                type="email"
                placeholder="someone@example.com"
                value={formik.values.personalEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                classes="bg-white/10"
              />
              {formik.touched.personalEmail && formik.errors.personalEmail && (
                <InputFeedback state="error">
                  {formik.errors.personalEmail}
                </InputFeedback>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                UW Email Address <span className="text-red">*</span>
              </label>
              <TextInput
                id="uwEmail"
                name="uwEmail"
                type="email"
                placeholder="someone@uwaterloo.ca"
                value={formik.values.uwEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                classes="bg-white/10"
              />
              {formik.touched.uwEmail && formik.errors.uwEmail && (
                <InputFeedback state="error">
                  {formik.errors.uwEmail}
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
                id="program"
                name="program"
                type="text"
                placeholder="Computer Science"
                value={formik.values.program}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                classes="bg-white/10"
              />
              {formik.touched.program && formik.errors.program && (
                <InputFeedback state="error">
                  {formik.errors.program}
                </InputFeedback>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Academic Term (Current or Most Recent)
                <span className="text-red">*</span>
              </label>
              <Dropdown
                id="academicTerm"
                name="academicTerm"
                placeholder="Select your academic term"
                options={terms}
                value={formik.values.academicTerm}
                onChange={formik.handleChange}
                background="bg-white/10"
              />
              {formik.touched.academicTerm && formik.errors.academicTerm && (
                <InputFeedback state="error">
                  {formik.errors.academicTerm}
                </InputFeedback>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Location Next Term <span className="text-red">*</span>
              </label>
              <Dropdown
                id="location"
                name="location"
                placeholder="Select where you will be next term"
                options={locationOptions}
                value={formik.values.location}
                onChange={formik.handleChange}
                background="bg-white/10"
              />
              {formik.touched.location && formik.errors.location && (
                <InputFeedback state="error">
                  {formik.errors.location}
                </InputFeedback>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Past Executive Experience */}
      <div className="m-6 rounded-lg border-0.5 border-solid border-white/20 bg-slateBlue p-6">
        <h2 className="mb-6 text-xl font-semibold text-white">
          Past Executive Experience
        </h2>

        <div className="space-y-4">
          <div>
            <label className="mb-3 block text-sm font-medium text-white">
              Have you been a DSC in the past?{" "}
              <span className="text-red">*</span>
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pastExecutive"
                  value="Yes"
                  checked={formik.values.pastExecutive === "Yes"}
                  onChange={formik.handleChange}
                  className="text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 mr-2 h-4 w-4"
                />
                <span className="text-white">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pastExecutive"
                  value="No"
                  checked={formik.values.pastExecutive === "No"}
                  onChange={formik.handleChange}
                  className="text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 mr-2 h-4 w-4"
                />
                <span className="text-white">No</span>
              </label>
            </div>
            {formik.touched.pastExecutive && formik.errors.pastExecutive && (
              <InputFeedback state="error">
                {formik.errors.pastExecutive}
              </InputFeedback>
            )}
          </div>

          {formik.values.pastExecutive === "Yes" && (
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                What role(s) were you in and which term(s)?{" "}
                <span className="text-red">*</span>
              </label>
              <TextArea
                id="pastExecutiveRoles"
                name="pastExecutiveRoles"
                placeholder=""
                value={formik.values.pastExecutiveRoles || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={4}
                background="bg-white/10"
              />
              {formik.touched.pastExecutiveRoles &&
                formik.errors.pastExecutiveRoles && (
                  <InputFeedback state="error">
                    {formik.errors.pastExecutiveRoles}
                  </InputFeedback>
                )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
