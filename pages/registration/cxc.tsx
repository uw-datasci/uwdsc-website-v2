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

function CxCRegistrationpage() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      pronoun: "",
      ethnicity: "",
      phoneNumber: "",
      email: "",
      discordUsername: "",
      term: "",
      faculty: [],
      program: "",
      tshirtSize: "",
      resumeLink: "",
      githubLink: "",
      linkedInLink: "",
      anyLink: "",
      hackathonNum: "",
      cxcGoals: "",
      ambitions: "",
      consent: false,
    },
    validationSchema: CxCRegistrationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Form data:", values);
      resetForm();
    },
  });

  const termOptions = [
    "1A",
    "1B",
    "2A",
    "2B",
    "3A",
    "3B",
    "4A",
    "4B",
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

  const facultyOptions = [
    "Mathematics",
    "Engineering",
    "Arts",
    "Environment",
    "Health",
    "Science",
  ];

  const sizeOptions = ["XS", "S", "M", "L", "XL"];

  const hackathonNumOptions = [
    "This will be my first!",
    "1",
    "2",
    "3",
    "4",
    "5+",
  ];

  return (
    <div>
      <div
        className="relative z-10 mx-auto my-0 min-h-screen py-10"
        style={{
          background: "linear-gradient(to bottom, #000000, #03137c)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <CxCBackground />
        <div className="relative z-20 flex min-h-screen flex-col items-center space-y-8">
          {/* CXC Title */}
          <div className="font-jersey relative left-0 top-0 z-[-1] mb-[100px] w-full text-white">
            <div className="mx-auto flex flex-col items-center justify-center">
              <div className="text-xl leading-none tracking-[0.05em] lg:text-6xl lg:tracking-[0.1em]">
                UWDSC Presents
              </div>
              <div className="leading-1 text-3xl tracking-[0.1em] lg:text-10xl lg:tracking-[0.2em]">
                A DATA SCIENCE HACKATHON
              </div>
              <div className="flex flex-row items-center justify-center gap-4 text-7xl lg:gap-8 lg:text-[120px]">
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
          <div className="flex w-[80%] flex-col items-center space-y-8 px-[5%] py-[3%]">
            {/* Application Form */}
            <div className="font-jersey mx-auto mb-[200px] w-[60%] rounded-[30px] border-2 border-white bg-gradient-to-b from-[rgba(0,9,255,0.5)] to-[rgba(255,150,214,0.5)] p-4 text-center font-thin tracking-wider text-white">
              <div className="min-h-screen px-5 py-10 text-white">
                <h1 className="mb-8 text-center text-5xl font-thin tracking-widest md:text-9xl">
                  Application Form
                </h1>
                <form
                  onSubmit={formik.handleSubmit}
                  className="mx-auto max-w-xl space-y-4"
                >
                  {/* First Name and Last Name */}
                  <p className="text-left text-xl font-thin tracking-widest">
                    Name
                  </p>
                  <div className="flex gap-4">
                    <div className="w-[50%] flex-col">
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
                    <div className="w-[50%] flex-col">
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
                  <p className="text-left text-xl font-thin tracking-widest">
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
                  />
                  <p className="text-left text-xl font-thin tracking-widest">
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
                  />
                  <p className="text-left text-xl font-thin tracking-widest">
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
                  <p className="text-left text-xl font-thin tracking-widest">
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
                  <p className="text-left text-xl font-thin tracking-widest">
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
                  <p className="text-left text-xl font-thin tracking-widest">
                    Current or Most Recent Study Term (e.g. 1B)
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
                  />
                  <p className="text-left text-xl font-thin tracking-widest">
                    Faculty
                  </p>
                  <MultipleDropdown
                    id={"selectFaculty"}
                    name={"faculty"}
                    options={facultyOptions}
                    placeholder="Select Faculties"
                    value={formik.values.faculty}
                    onChange={formik.handleChange}
                    maxSelection={2}
                    errors={formik.errors}
                    touched={formik.touched}
                  />
                  <p className="text-left text-xl font-thin tracking-widest">
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
                  <p className="text-left text-xl font-thin tracking-widest">
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
                  />
                  <p className="text-left text-xl font-thin tracking-widest">
                    Resume (Publicly Accessible Link)
                  </p>
                  <TextInput
                    id={"resumeLink"}
                    name={"resumeLink"}
                    type={"text"}
                    placeholder="Enter Resume Link"
                    value={formik.values.resumeLink}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errors={formik.errors}
                    touched={formik.touched}
                  />
                  <p className="text-left text-xl font-thin tracking-widest">
                    GitHub (Profile Link)
                  </p>
                  <TextInput
                    id={"githubLink"}
                    name={"githubLink"}
                    type={"text"}
                    placeholder="Enter GitHub Link"
                    value={formik.values.githubLink}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errors={formik.errors}
                    touched={formik.touched}
                  />
                  <p className="text-left text-xl font-thin tracking-widest">
                    LinkedIn (Profile Link)
                  </p>
                  <TextInput
                    id={"linkedInLink"}
                    name={"linkedInLink"}
                    type={"text"}
                    placeholder="Enter LinkedIn Link"
                    value={formik.values.linkedInLink}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errors={formik.errors}
                    touched={formik.touched}
                  />
                  <p className="text-left text-xl font-thin tracking-widest">
                    Any Other Link (Portfolio, Personal Website, etc.)
                  </p>
                  <TextInput
                    id={"anyLink"}
                    name={"anyLink"}
                    type={"text"}
                    placeholder="Enter Link"
                    value={formik.values.anyLink}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errors={formik.errors}
                    touched={formik.touched}
                  />
                  <p className="text-left text-xl font-thin tracking-widest">
                    Number of Hackathons Attended as a Hacker
                  </p>
                  <SingleDropdown
                    id={"hackathonNum"}
                    name={"hackathonNum"}
                    options={hackathonNumOptions}
                    placeholder="Select number of hackthons attended"
                    value={formik.values.hackathonNum}
                    onChange={formik.handleChange}
                    errors={formik.errors}
                    touched={formik.touched}
                  />
                  <p className="text-left text-xl font-thin tracking-widest">
                    What do you hope to see and gain from CxC? Specific
                    workshops, games, activities, anything! (500 characters)
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
                  <p className="text-left text-xl font-thin tracking-widest">
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
                  <div className="flex-col justify-start">
                    <Checkbox
                      id={"consent"}
                      name={"consent"}
                      checkboxString={
                        "I consent to having my email and resume shared with CxC and DSC sponsors"
                      }
                      value={formik.values.consent}
                      onChange={formik.handleChange}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  </div>
                  <Button
                    type="submit"
                    hierarchy="primary"
                    font="font-bold"
                    text="lg:text-lg"
                    padding="py-3 sm:px-7"
                    rounded="rounded-lg"
                    classes="w-full sm:w-auto"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(CxCRegistrationpage, []);
