// Before user can access registration page, user must be logged in. User will be redirected to login page if not logged in
// Use hooks and useState to check if user is logged in

import Image from "next/image";

import CxCBackground from "@/components/UI/CxCBackground";
import spacer from "@/public/cxc/asset-spacer.png";

import TextInput from "@/components/UI/Inputs/CxC/TextInput";
import SingleDropdown from "@/components/UI/Inputs/CxC/SingleDropdown";
import MultipleDropdown from "@/components/UI/Inputs/CxC/MultipleDropdown";
import TextArea from "@/components/UI/Inputs/CxC/TextArea";
import Checkbox from "@/components/UI/Inputs/CxC/Checkbox";
import { useFormik } from "formik";
import { CxCRegistrationSchema } from "@/utils/formValidation";
import Button from "@/components/UI/Button";
import withAuth from "@/components/permissions/authPage";
import { useEffect, useState } from "react";
import {
  attachCurrentUserRegistrationByID,
  getCurrentUser,
  getCurrentUserRegistrationByID,
  patchCurrentUserRegistrationByID,
} from "@/utils/userApiCalls";
import InputFeedback from "@/components/UI/Inputs/CxC/InputFeedback";

import {} from "next/font/google";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

type CxCFields = {
  firstName: string;
  lastName: string;
  pronoun: string;
  ethnicity: string;
  phoneNumber: string;
  email: string;
  discordUsername: string;
  term: string;
  school: string;
  program: string;
  dietaryRestrictions: string[];
  specificAllergies: string;
  tshirtSize: string;
  resumeLink: string;
  githubLink: string;
  linkedInLink: string;
  anyLink: string;
  hackathonRole: string[];
  hackathonNum: number;
  cxcGoals: string;
  ambitions: string;
  consent: boolean;
} | null;

function CxCRegistrationpage() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [existingField, setExistingField] = useState<CxCFields>(null);
  const [fromUserModel, setFromUserModel] = useState<CxCFields>(null);

  useEffect(() => {
    const updateRegistrationFromDB = async () => {
      try {
        const response = await getCurrentUserRegistrationByID();
        setIsRegistered(response.data.exist);
        setExistingField(response.data.fields);
      } catch (e) {
        console.error(e);
      }
    };

    const attempToFillFromUser = async () => {
      try {
        const user = (await getCurrentUser()).data.user;
        console.log(user);
        const [firstName, ...lastNames] = user.username.split(" ");
        const lastName = lastNames.join(" ");
        let term = "";
        switch (user.term) {
          case "1A":
          case "1B":
            term = "1st Year";
            break;
          case "2A":
          case "2B":
            term = "2nd Year";
            break;
          case "3A":
          case "3B":
            term = "3rd Year";
            break;
          case "4A":
          case "4B":
            term = "4th Year+";
            break;
          case "Other/Non-waterloo":
            break;
          default:
            term = user.term;
        }
        setFromUserModel({
          firstName: firstName,
          lastName: lastName,
          pronoun: "",
          ethnicity: "",
          phoneNumber: "",
          email: user.email,
          discordUsername: "",
          term: term,
          school: "",
          program: "",
          dietaryRestrictions: [],
          specificAllergies: "",
          tshirtSize: "",
          resumeLink: "",
          githubLink: "",
          linkedInLink: "",
          anyLink: "",
          hackathonRole: [],
          hackathonNum: 0,
          cxcGoals: "",
          ambitions: "",
          consent: false,
        });
      } catch (e) {
        console.error(e);
      }
    };

    updateRegistrationFromDB();
    attempToFillFromUser();
  }, []);

  const formik = useFormik({
    initialValues: existingField ??
      fromUserModel ?? {
        firstName: "",
        lastName: "",
        pronoun: "",
        ethnicity: "",
        phoneNumber: "",
        email: "",
        discordUsername: "",
        term: "",
        school: "",
        program: "",
        dietaryRestrictions: [],
        specificAllergies: "",
        tshirtSize: "",
        resumeLink: "",
        githubLink: "",
        linkedInLink: "",
        anyLink: "",
        hackathonRole: [],
        hackathonNum: 0,
        cxcGoals: "",
        ambitions: "",
        consent: false,
      },
    enableReinitialize: true,
    validationSchema: CxCRegistrationSchema,
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      if (!isRegistered) {
        try {
          attachCurrentUserRegistrationByID(values);
          setSubmitFeedback("Successfully registered!");
          setSubmitSuccess(true);
          setIsRegistered(true);
        } catch (e) {
          setSubmitFeedback("Something went wrong, please try again later");
          setSubmitSuccess(false);
        }
      } else {
        try {
          patchCurrentUserRegistrationByID(values);
          setSubmitFeedback("Successfully updated registration!");
          setSubmitSuccess(true);
          setIsRegistered(true);
        } catch (e) {
          setSubmitFeedback("Something went wrong, please try again later");
          setSubmitSuccess(false);
        }
      }
      setIsLoading(false);
      // resetForm();
    },
  });

  const termOptions = [
    "Not currently a student",
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year+",
    "Masters",
    "PHD",
  ];

  const pronounOptions = [
    "He/Him",
    "She/Her",
    "They/Them",
    "He/They",
    "She/They",
    "Other",
    "Prefer not to say",
  ];

  const ethnicityOptions = [
    "Chinese",
    "Japanese",
    "Korean",
    "Filipino",
    "Vietnamese",
    "South Asian",
    "Black or African",
    "Hispanic / Latino / Spanish Origin",
    "Middle Eastern",
    "First Nations",
    "Metis",
    "Inuit",
    "Caucasian",
    "Other Asian (Thai, Cambodian, etc)",
    "Other",
  ];

  const dietaryRestrictionsOptions = [
    "Halal",
    "Vegan",
    "Vegetarian",
    "Gluten-Free",
    "Dairy-Free",
    "None",
  ];

  const sizeOptions = ["XS", "S", "M", "L", "XL"];

  const hackathonRoleOptions = [
    "Hacker",
    "Volunteer",
    "Mentor",
    "Judge",
    "Organizer",
    "Never been to a hackathon previously",
  ];

  return (
    <div>
      <div
        className="relative z-10 mx-auto my-0 min-h-screen"
        style={{
          background: "linear-gradient(to bottom, #000000, #03137c)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <CxCBackground />
        <div className="relative z-20 flex min-h-screen flex-col items-center space-y-8">
          {/* CXC Title */}
          <div className="z-[-1] flex h-[30vh] w-full items-center justify-center font-jersey text-white md:h-[calc(100vh-74px)]">
            <div className="mx-auto flex flex-col items-center justify-center text-center">
              <div className="text-responsive-text leading-none tracking-[0.05em] lg:tracking-[0.1em]">
                UWDSC Presents
              </div>
              <div className="leading-1 text-responsive-subtitle tracking-[0.1em] lg:tracking-[0.2em]">
                A DATA SCIENCE HACKATHON
              </div>
              <div className="flex flex-row items-center justify-center gap-4 text-responsive-title lg:gap-8">
                <span>2</span>
                <span>0</span>
                <Image
                  src={spacer}
                  alt=""
                  className="inline-block h-full max-h-[1em] w-auto align-middle"
                />
                <span>C</span>
                <span>x</span>
                <span>C</span>
                <Image
                  src={spacer}
                  alt=""
                  className="inline-block h-full max-h-[1em] w-auto align-middle"
                />
                <span>2</span>
                <span>5</span>
              </div>
            </div>
          </div>
          <div className="flex w-[95%] flex-col items-center space-y-8 md:w-[80%] xl:w-[70%] 3xl:w-[60%]">
            {/* Application Form */}
            <div className="mx-auto mb-[200px] w-[100%] rounded-[30px] border-2 border-double border-white bg-gradient-to-b  from-[rgba(0,9,255,0.5)] to-[rgba(237,150,214,0.5)] p-4 text-center font-jersey font-thin tracking-wider text-white md:border-4">
              <div className="min-h-screen px-5 py-10 text-white">
                <h1 className="mb-8 text-center text-responsive-subtitle font-thin tracking-widest">
                  Application Form
                </h1>
                <form
                  onSubmit={formik.handleSubmit}
                  className="mx-auto max-w-xl space-y-12"
                >
                  {/* First Name and Last Name */}
                  <div>
                    <div className="flex flex-col gap-12 lg:flex-row">
                      <div className="w-full">
                        <p className="mb-2 text-left text-xl font-thin tracking-widest">
                          First Name
                        </p>
                        <div className="w-full flex-col">
                          <TextInput
                            id={"firstName"}
                            name={"firstName"}
                            type={"text"}
                            placeholder={"Enter First Name"}
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            errors={formik.errors}
                            touched={formik.touched}
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <p className="mb-2 text-left text-xl font-thin tracking-widest">
                          Last Name
                        </p>
                        <div className="w-full flex-col">
                          <TextInput
                            id={"lastName"}
                            name={"lastName"}
                            type={"text"}
                            placeholder={"Enter Last Name"}
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            errors={formik.errors}
                            touched={formik.touched}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-left text-xl font-thin tracking-widest">
                      Pronouns
                    </p>
                    <SingleDropdown
                      id={"pronoun"}
                      name={"pronoun"}
                      options={pronounOptions}
                      placeholder="Select Pronouns"
                      value={formik.values.pronoun}
                      onChange={formik.handleChange}
                      errors={formik.errors}
                      touched={formik.touched}
                      setTouched={formik.setTouched}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-left text-xl font-thin tracking-widest">
                      Ethnicities
                    </p>
                    <SingleDropdown
                      id={"ethnicity"}
                      name={"ethnicity"}
                      options={ethnicityOptions}
                      placeholder="Select Ethnicities"
                      value={formik.values.ethnicity}
                      onChange={formik.handleChange}
                      errors={formik.errors}
                      touched={formik.touched}
                      setTouched={formik.setTouched}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-left text-xl font-thin tracking-widest">
                      Phone Number
                    </p>
                    <TextInput
                      id={"phoneNumber"}
                      name={"phoneNumber"}
                      type={"text"}
                      placeholder={"Enter Phone Number"}
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-left text-xl font-thin tracking-widest">
                      Email
                    </p>

                    <TextInput
                      id={"email"}
                      name={"email"}
                      type={"text"}
                      placeholder="Enter Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-left text-xl font-thin tracking-widest">
                      Discord Username
                    </p>
                    <TextInput
                      id={"discordUsername"}
                      name={"discordUsername"}
                      type={"text"}
                      placeholder="Enter Discord Username"
                      value={formik.values.discordUsername}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-left text-xl font-thin tracking-widest">
                      Current level of study
                    </p>
                    <SingleDropdown
                      id={"studyTerm"}
                      name={"term"}
                      options={termOptions}
                      placeholder="Select Study Term"
                      value={formik.values.term}
                      onChange={formik.handleChange}
                      errors={formik.errors}
                      touched={formik.touched}
                      setTouched={formik.setTouched}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-left text-xl font-thin tracking-widest">
                      School
                    </p>
                    <TextInput
                      id={"school"}
                      name={"school"}
                      type={"text"}
                      placeholder="Enter School Full Name"
                      value={formik.values.school}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-left text-xl font-thin tracking-widest">
                      Program
                    </p>
                    <TextInput
                      id={"program"}
                      name={"program"}
                      type={"text"}
                      placeholder="Enter Program Name"
                      value={formik.values.program}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-left text-xl font-thin tracking-widest">
                      Dietary Restrictions
                    </p>
                    <MultipleDropdown
                      id={"dietaryRestrictions"}
                      name={"dietaryRestrictions"}
                      options={dietaryRestrictionsOptions}
                      placeholder="Select Restrictions"
                      value={formik.values.dietaryRestrictions}
                      onChange={formik.handleChange}
                      maxSelection={10}
                      errors={formik.errors}
                      touched={formik.touched}
                      setTouched={formik.setTouched}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-left text-xl font-thin tracking-widest">
                      Specific Allergies
                    </p>
                    <TextInput
                      id={"specificAllergies"}
                      name={"specificAllergies"}
                      type={"text"}
                      placeholder="List specific allergies (if any)"
                      value={formik.values.specificAllergies}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-left text-xl font-thin tracking-widest">
                      T-Shirt Size
                    </p>
                    <SingleDropdown
                      id={"tshirtSize"}
                      name={"tshirtSize"}
                      options={sizeOptions}
                      placeholder="Select T-Shirt Size"
                      value={formik.values.tshirtSize}
                      onChange={formik.handleChange}
                      errors={formik.errors}
                      touched={formik.touched}
                      setTouched={formik.setTouched}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-left text-xl font-thin tracking-widest">
                      Resume (Publicly Accessible Google Drive Link)
                    </p>
                    <TextInput
                      id={"resumeLink"}
                      name={"resumeLink"}
                      type={"text"}
                      placeholder="drive.google.com/file/..."
                      value={formik.values.resumeLink}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-left text-xl font-thin tracking-widest">
                      GitHub (Profile Link)
                    </p>
                    <TextInput
                      id={"githubLink"}
                      name={"githubLink"}
                      type={"text"}
                      placeholder="Enter GitHub Link (Optional)"
                      value={formik.values.githubLink}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-left text-xl font-thin tracking-widest">
                      LinkedIn (Profile Link)
                    </p>
                    <TextInput
                      id={"linkedInLink"}
                      name={"linkedInLink"}
                      type={"text"}
                      placeholder="Enter LinkedIn Link (Optional)"
                      value={formik.values.linkedInLink}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-left text-xl font-thin tracking-widest">
                      Any Other Link (Portfolio, Personal Website, etc.)
                    </p>
                    <TextInput
                      id={"anyLink"}
                      name={"anyLink"}
                      type={"text"}
                      placeholder="Enter Link (Optional)"
                      value={formik.values.anyLink}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-left text-xl font-thin tracking-widest">
                      Have you attended a hackathon before?
                    </p>
                    <MultipleDropdown
                      id={"hackathonRole"}
                      name={"hackathonRole"}
                      options={hackathonRoleOptions}
                      placeholder="Select roles"
                      value={formik.values.hackathonRole}
                      onChange={formik.handleChange}
                      maxSelection={10}
                      errors={formik.errors}
                      touched={formik.touched}
                      setTouched={formik.setTouched}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-left text-xl font-thin tracking-widest">
                      Number of Hackathons Attended
                    </p>
                    <TextInput
                      id={"hackathonNum"}
                      name={"hackathonNum"}
                      type={"number"}
                      placeholder="Enter number of hackthons attended"
                      value={formik.values.hackathonNum}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-left text-xl font-thin tracking-widest">
                      What do you hope to see and gain from CxC? Specific
                      workshops, skills, activities, anything! (500 characters)
                    </p>
                    <TextArea
                      id={"cxcGoals"}
                      name={"cxcGoals"}
                      placeholder="Enter Response"
                      value={formik.values.cxcGoals}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errors={formik.errors}
                      touched={formik.touched}
                      maxLength={500}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-left text-xl font-thin tracking-widest">
                      What are your long-term future ambitions? (500 characters)
                    </p>
                    <TextArea
                      id={"ambitions"}
                      name={"ambitions"}
                      placeholder="Enter Response"
                      value={formik.values.ambitions}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errors={formik.errors}
                      touched={formik.touched}
                      maxLength={500}
                    />
                  </div>
                  <div className="flex-col justify-start">
                    <Checkbox
                      id={"consent"}
                      name={"consent"}
                      checkboxString={
                        "I consent to having my email and resume shared with CxC and DSC sponsors"
                      }
                      wrapperClasses="text-xl"
                      value={formik.values.consent}
                      onChange={formik.handleChange}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </div>
                  {isLoading ? (
                    <LoadingSpinner size={60} classes="w-fit mx-auto" />
                  ) : (
                    <>
                      <Button
                        type="submit"
                        hierarchy="primary"
                        font="font-bold"
                        text="text-xl tracking-widest"
                        padding="py-3 sm:px-7"
                        rounded="rounded-lg"
                        classes="w-full sm:w-auto"
                      >
                        {isRegistered
                          ? "Update application"
                          : "Submit application"}
                      </Button>
                      <InputFeedback
                        state={submitSuccess ? "success" : "error"}
                      >
                        {submitFeedback}
                      </InputFeedback>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(CxCRegistrationpage, ["member", "admin"]);
