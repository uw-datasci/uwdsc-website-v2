// React/Redux Imports
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

// UI Imports
import Button from "@/components/UI/Button";
import Logo from "@/components/UI/Logo";

// Form Imports
import PopUpPanels from "../sections/templates/PopUpPanels";
import { removeSignUp } from "@/store/slices/signUpPageSlice";
import { displaySignIn } from "@/store/slices/signInPageSlice";
import ContactForm from "../sections/templates/ContactForm";
import {
  SIGN_UP_FORM_FIELDS_PART1,
  SIGN_UP_FORM_FIELDS_PART2,
} from "@/constants/forms";
import {
  SignUpFormPart1Schema,
  SignUpFormPart2Schema,
} from "@/utils/formValidation";
import { sendSignUpInfo } from "@/utils/apiCalls";
import ResendVerificationPage from "../sections/home/resendVerification";

export default function SignUpPage() {
  const [panelIndex, setPanelIndex] = useState<number>(0);
  const [fields, setFields] = useState<Record<string, string> | null>(null);
  const [email, setEmail] = useState<string>("");
  const signUpPage = useSelector((state: RootState) => state.signUpPage.value);
  const dispatch = useDispatch();
  const headings =
    "mt-0 text-2xl font-bold text-white 3xs:text-3xl 2xs:text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:mt-10 lg:mx-0 lg:mb-7 lg:max-w-[500px] 3xs:text-center lg:text-left lg:text-6xl xl:max-w-[540px] xl:text-9xl 2xl:max-w-[580px] 2xl:text-11xl 3xl:max-w-none 3xl:text-13xl";
  const subTexts =
    "mt-2 text-center leading-loose text-white  sm:text-lg lg:mx-0 lg:mb-14 lg:text-left lg:text-md xl:text-lg 2xl:text-xl";

  var part1Formik: { resetForm: () => void };

  const updatePart1Field = async (values: Record<string, string>) => {
    setFields({ ...values });
    setEmail(values.email);
    setPanelIndex(1);
  };

  const updatePart2Field = async (values: Record<string, string>) => {
    const combined: Record<string, string> = { ...fields, ...values };
    await sendSignUpInfo(combined);
  };

  const getFormik = (formik: any) => {
    part1Formik = formik;
  };

  const part2SuccessCallback = () => {
    part1Formik.resetForm();
    setPanelIndex(2);
  };

  return (
    <PopUpPanels
      isPopUp={signUpPage}
      moveDownFunc={() => {
        dispatch(removeSignUp());
      }}
      panelIndex={panelIndex}
      panels={[
        <>
          <div className="no-scrollbar flex w-full flex-col overflow-auto lg:flex-row lg:overflow-hidden">
            <div className="h-fit w-full border-r lg:my-auto lg:border-grey3 lg:p-8">
              <Logo classes="3xs:hidden lg:block lg:min-w-[70px] w-[30%]" />
              <h1 className={headings}>Join Us !</h1>
              <p className={subTexts}>
                Become a part of a growing community of data science enthusiasts
                and participate in engaging discussions, hands-on projects, and
                networking opportunities.
              </p>
            </div>
            <div className="lg:overflow-auto-x flex max-h-full w-full flex-col justify-center py-10 lg:p-8">
              <div className="w-full lg:max-h-[100%] lg:overflow-auto">
                <ContactForm
                  title=""
                  id=""
                  getFormik={getFormik}
                  includeSideInfo={false}
                  description={<></>}
                  fields={SIGN_UP_FORM_FIELDS_PART1}
                  validationSchema={SignUpFormPart1Schema}
                  onSubmit={updatePart1Field}
                  successMessage=""
                  errorMessage=""
                  resetForm={false}
                  formClasses="mx-container "
                  inputFeedbackClasses="mt-1 pl-6 mb-[-0.5rem] leading-relaxed text-s "
                  customButton={
                    <>
                      <Button
                        type="submit"
                        hierarchy="primary"
                        font="font-bold"
                        text="lg:text-lg"
                        padding="py-3 sm:px-7"
                        rounded="rounded-lg"
                        classes="w-full"
                      >
                        Sign Up!
                      </Button>
                      <p
                        className="text-s cursor-pointer p-2 text-grey3 hover:underline"
                        onClick={() => {
                          dispatch(removeSignUp());
                          {
                            /*hide sign-up*/
                          }
                          dispatch(displaySignIn());
                          {
                            /*show sign-in*/
                          }
                        }}
                      >
                        Already a member? Sign in here.
                      </p>
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </>,
        <>
          <div className="no-scrollbar lg:overflow-hidden-x flex w-full flex-col overflow-auto lg:flex-row">
            <div className="h-fit w-full border-r lg:my-auto lg:border-grey3 lg:p-8">
              <h1 className={headings}>Almost There !</h1>
              <p className={subTexts}>
                Once you have submitted, you should receive a confirmation email
                to your email account.<br /><br />
                And after all that hard work ... <br />
                Welcome to the club !<br /><br />
                *If 2+ faculties that include Math, choose Math
              </p>
            </div>
            <div className="flex max-h-full w-full flex-col justify-center py-10 lg:overflow-auto lg:p-8">
              <div className="w-full lg:max-h-[100%] lg:overflow-auto">
                <ContactForm
                  title=""
                  id=""
                  includeSideInfo={false}
                  description={<></>}
                  fields={SIGN_UP_FORM_FIELDS_PART2}
                  validationSchema={SignUpFormPart2Schema}
                  onSubmit={updatePart2Field}
                  errorMessage="Something went wrong. Please let us know and try again later."
                  successMessage="Successfully registered. Check your email!"
                  successCallback={part2SuccessCallback}
                  resetForm={true}
                  formClasses="mx-container "
                  inputFeedbackClasses="mt-1 pl-1 leading-relaxed text-s "
                  customButton={
                    <>
                      <Button
                        type="submit"
                        hierarchy="primary"
                        font="font-bold"
                        text="lg:text-lg"
                        padding="py-3 sm:px-7"
                        rounded="rounded-lg"
                        classes="w-full"
                      >
                        Submit
                      </Button>
                      <p
                        className="text-s cursor-pointer p-2 text-grey3 hover:underline"
                        onClick={() => {
                          setPanelIndex(0);
                        }}
                      >
                        Go back
                      </p>
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </>,
        <>
          <div className="no-scrollbar lg:overflow-hidden-x w-full overflow-auto">
            <ResendVerificationPage
              email={email}
              panelIndex={panelIndex}
              setPanelIndex={setPanelIndex}
            />
          </div>
        </>,
      ]}
    />
  );
}
