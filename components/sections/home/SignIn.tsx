import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { moveDown as signInMoveDown } from "@/store/slices/signInPageSlice";
import { moveUp as signUpMoveUp } from "@/store/slices/signUpPageSlice";
import { login } from "@/store/slices/loginTokenSlice";

import Button from "@/components/UI/Button";
import GradientBorder from "@/components/UI/GradientBorder";
import Logo from "@/components/UI/Logo";

import PopUpPanels from "../templates/PopUpPanels";
import ContactForm from "../templates/ContactForm";
import { SIGN_IN_FORM_FIELDS, FORGOT_PASSWORD_FORM_FIELDS } from "@/constants/forms";
import { validateSignInForm, validateForgotPasswordForm } from "@/utils/formValidation";
import { sendSignInInfo } from "@/utils/emails";
import { ChevronDown } from "react-feather";
import { clear } from "console";

const opacityTrans = "duration-1000 transition-opacity ease-in-out ";

export default function SignInPage() {
  const [panelIndex, setPanelIndex] = useState<number>(0);
  const signInPage = useSelector((state: RootState) => state.signInPage.value);
  const dispatch = useDispatch();
  const headings = "mt-0 text-2xl font-bold text-white 3xs:text-3xl 2xs:text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:mt-10 lg:mx-0 lg:mb-7 lg:max-w-[500px] 3xs:text-center lg:text-left lg:text-6xl xl:max-w-[540px] xl:text-9xl 2xl:max-w-[580px] 2xl:text-11xl 3xl:max-w-none 3xl:text-13xl";
  const subTexts = "mt-2 text-center leading-loose text-white  sm:text-lg lg:mx-0 lg:mb-14 lg:text-left lg:text-md xl:text-lg 2xl:text-xl";

  const sleep = async (ms = 0) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const signIn = async (values: Record<string, string>) => {
    const id = values.email.replace(/@uwaterloo\.ca/g,"");
    try {
      const res = await sendSignInInfo(values);
      const accessToken = res.data.accessToken;
      dispatch(login({token: accessToken, id : id}));
      return accessToken;
    } catch (error) {
      console.error('Error:', error); // Handle any errors
      throw error;
    }
  }

  const signInSuccessful = async () => {
    await sleep(400);
    dispatch(signInMoveDown());
  }

  const resetPass = async (values: Record<string, string>) => {
    // To be implemented
  }

  return (
    <PopUpPanels isPopUp={signInPage} moveDownFunc={() => {dispatch(signInMoveDown())}} panelIndex={panelIndex}
      panels={
        [
          <>
            <div className="w-full flex my-auto flex-col lg:flex-row overflow-auto no-scrollbar lg:overflow-hidden">
              <div className="w-full h-fit border-r lg:border-grey3 lg:p-8 lg:my-auto">
                <Logo classes="3xs:hidden lg:block lg:min-w-[70px] w-[30%]"/>
                <h1 className={headings}>Sign in</h1>
                <p className={subTexts}>Already a member? Sign in here to access your profile and membership.</p>
              </div>
              <div className="w-full max-h-full py-10 lg:p-8 flex flex-col justify-center lg:overflow-auto">
                <div className="w-full">
                  <ContactForm
                    title=""
                    id=""
                    includeSideInfo={false}
                    description={<></>}
                    fields={SIGN_IN_FORM_FIELDS}
                    validate={validateSignInForm}
                    onSubmit={signIn}
                    successMessage="Signed in !"
                    successCallback={signInSuccessful}
                    errorMessage="Email or password does not match an account"
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
                          Sign in
                        </Button>
                        <div className="flex flex-col lg:flex-row justify-between">
                          <p className="text-s text-grey3 p-2 hover:underline cursor-pointer" onClick={()=>{
                            setPanelIndex(1);
                          }}>Forgot password ?</p>
                          <p className="text-s text-grey3 p-2 hover:underline cursor-pointer" onClick={()=>{
                            dispatch(signInMoveDown())
                            dispatch(signUpMoveUp())
                          }}>Not a member yet? Join here.</p>
                        </div>
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          </>,
          <>
            <div className="w-full flex my-auto 3xs:flex-col lg:flex-row overflow-auto no-scrollbar lg:overflow-hidden">
              <div className="w-full h-fit border-r lg:border-grey3 lg:p-8 lg:my-auto">
                <h1 className={headings}>Forgot your password?</h1>
                <p className={subTexts}>Simply enter your uwaterloo.ca email that you used to sign up. A verifcation email will be sent to the email you provided.<br/><br/>If you still can&apos;t get hold of your account, please email us at PLACEHOLDER</p>
              </div>
              <div className="w-full max-h-full py-10 lg:p-8 flex flex-col justify-center lg:overflow-auto">
                <div className="w-full">
                  <ContactForm
                    title=""
                    id=""
                    includeSideInfo={false}
                    description={<></>}
                    fields={FORGOT_PASSWORD_FORM_FIELDS}
                    validate={validateForgotPasswordForm}
                    onSubmit={resetPass}
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
                          Reset password
                        </Button>
                        <div className="flex flex-col lg:flex-row justify-between">
                          <p className="text-s text-grey3 p-2 hover:underline cursor-pointer" onClick={()=>{
                            setPanelIndex(0);
                          }}>Go back</p>
                        </div>
                      </>
                    }
                  />
                </div>
              </div>`
            </div>
          </>
        ]}
    />
  );
}