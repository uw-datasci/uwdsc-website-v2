import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { removeSignIn } from "@/store/slices/signInPageSlice";
import { displaySignUp } from "@/store/slices/signUpPageSlice";
import { login } from "@/store/slices/loginTokenSlice";

import Button from "@/components/UI/Button";
import Logo from "@/components/UI/Logo";

import PopUpPanels from "../sections/templates/PopUpPanels";
import Form from "../sections/templates/Form";
import {
  SIGN_IN_FORM_FIELDS,
  FORGOT_PASSWORD_FORM_FIELDS,
} from "@/constants/forms";
import {
  SignInFormSchema,
  ForgotPasswordFormSchema,
} from "@/utils/formValidation";
import { sendSignInInfo, sendForgotPassRequest } from "@/utils/apiCalls/userApiCalls";

export default function SignInPage() {
  const [panelIndex, setPanelIndex] = useState<number>(0);
  const signInPage = useSelector((state: RootState) => state.signInPage.value);
  const dispatch = useDispatch();
  const headings =
    "mt-0 text-2xl font-bold text-white 3xs:text-3xl 2xs:text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:mt-10 lg:mx-0 lg:mb-7 lg:max-w-[500px] 3xs:text-center lg:text-left lg:text-6xl xl:max-w-[540px] xl:text-9xl 2xl:max-w-[580px] 2xl:text-11xl 3xl:max-w-none 3xl:text-13xl";
  const subTexts =
    "mt-2 text-center leading-loose text-white  sm:text-lg lg:mx-0 lg:mb-14 lg:text-left lg:text-md xl:text-lg 2xl:text-xl";

  const sleep = async (ms = 0) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const signIn = async (values: Record<string, string>) => {
    try {
      const res = await sendSignInInfo(values);
      const accessToken = res.data.accessToken;
      const name = res.data.name;
      const role = res.data.role;
      dispatch(login({ token: accessToken, name: name, role: role }));
    } catch (error) {
      console.error("Error:", error); // Handle any errors
      throw error;
    }
  };

  const signInSuccessful = async () => {
    await sleep(400);
    dispatch(removeSignIn());
  };

  const forgotPass = async (values: Record<string, string>) => {
    try {
      await sendForgotPassRequest(values);
    } catch (error) {
      console.error("Error:", error); // Handle any errors
      throw error;
    }
  };

  return (
    <PopUpPanels
      isPopUp={signInPage}
      moveDownFunc={() => {
        dispatch(removeSignIn());
      }}
      panelIndex={panelIndex}
      panels={[
        <>
          <div className="no-scrollbar lg:overflow-hidden-x my-auto flex w-full flex-col overflow-auto lg:flex-row">
            <div className="h-fit w-full border-r lg:my-auto lg:border-grey3 lg:p-8">
              <Logo classes="3xs:hidden lg:block lg:min-w-[70px] w-[30%]" />
              <h1 className={headings}>Sign in</h1>
              <p className={subTexts}>
                Already a member? Sign in here to access your profile and
                membership.
              </p>
            </div>
            <div className="flex max-h-full w-full flex-col justify-center py-10 lg:overflow-auto lg:p-8">
              <div className="max-h-[100%] w-full overflow-auto">
                <Form
                  title=""
                  id=""
                  includeSideInfo={false}
                  description={<></>}
                  fields={SIGN_IN_FORM_FIELDS}
                  validationSchema={SignInFormSchema}
                  onSubmit={signIn}
                  successMessage="Signed in !"
                  successCallback={signInSuccessful}
                  errorMessage="Email or password does not match an account"
                  resetForm={true}
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
                      <div className="flex flex-col justify-between lg:flex-row">
                        <p
                          className="text-s cursor-pointer p-2 text-grey3 hover:underline"
                          onClick={() => {
                            setPanelIndex(1);
                          }}
                        >
                          Forgot password?
                        </p>
                        <p
                          className="text-s cursor-pointer p-2 text-grey3 hover:underline"
                          onClick={() => {
                            dispatch(removeSignIn());
                            dispatch(displaySignUp());
                          }}
                        >
                          Not a member yet? Join here.
                        </p>
                      </div>
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </>,
        <>
          <div className="no-scrollbar lg:overflow-hidden-x my-auto flex w-full overflow-auto 3xs:flex-col lg:flex-row">
            <div className="h-fit w-full border-r lg:my-auto lg:border-grey3 lg:p-8">
              <h1 className={headings}>Forgot your password?</h1>
              <p className={subTexts}>
                Simply enter your uwaterloo.ca email that you used to sign up. A
                verifcation email will be sent to the email you provided after
                1-2 minutes.
                <br />
                <br />
                If you still can&apos;t get hold of your account, please email
                us at <strong>dsc@uwdatascience.ca</strong>
              </p>
            </div>
            <div className="flex max-h-full w-full flex-col justify-center py-10 lg:overflow-auto lg:p-8">
              <div className="max-h-[100%] w-full overflow-auto">
                <Form
                  title=""
                  id=""
                  includeSideInfo={false}
                  description={<></>}
                  fields={FORGOT_PASSWORD_FORM_FIELDS}
                  validationSchema={ForgotPasswordFormSchema}
                  onSubmit={forgotPass}
                  successMessage="Forgot password email sent! Check your inbox/spam."
                  errorMessage="Something went wrong, please contact us."
                  resetForm={true}
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
                      <div className="flex flex-col justify-between lg:flex-row">
                        <p
                          className="text-s cursor-pointer p-2 text-grey3 hover:underline"
                          onClick={() => {
                            setPanelIndex(0);
                          }}
                        >
                          Go back
                        </p>
                      </div>
                    </>
                  }
                />
              </div>
            </div>
            `
          </div>
        </>,
      ]}
    />
  );
}
