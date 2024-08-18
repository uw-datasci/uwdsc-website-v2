import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { moveDown as signInMoveDown } from "@/store/slices/signInPageSlice";
import { moveUp as signUpMoveUp } from "@/store/slices/signUpPageSlice";
import { login } from "@/store/slices/loginTokenSlice";

import Button from "@/components/UI/Button";
import GradientBorder from "@/components/UI/GradientBorder";
import Logo from "@/components/UI/Logo";

import ContactForm from "../templates/ContactForm";
import { SIGN_IN_FORM_FIELDS } from "@/constants/forms";
import { validateSignInForm } from "@/utils/formValidation";
import { sendSignInInfo } from "@/utils/emails";
import { clear } from "console";

const opacityTrans = "duration-1000 transition-opacity ease-in-out ";

export default function SignInPage() {
  const [fields, setFields] = useState<Record<string,string>|null>(null);
  const signInPage = useSelector((state: RootState) => state.signInPage.value);
  const dispatch = useDispatch();
  const headings = "mt-10 text-2xl font-bold text-white 3xs:text-3xl 2xs:max-w-[390px] 2xs:text-4xl xs:max-w-[450px] xs:text-5xl sm:text-6xl md:max-w-[520px] md:text-7xl lg:mx-0 lg:mb-7 lg:max-w-[500px] lg:text-left lg:text-6xl xl:max-w-[540px] xl:text-9xl 2xl:max-w-[580px] 2xl:text-11xl 3xl:max-w-none 3xl:text-13xl";
  const subTexts = "mt-2 max-w-[350px] text-center leading-loose text-white sm:max-w-[420px] sm:text-lg lg:mx-0 lg:mb-14 lg:max-w-none lg:text-left lg:text-md xl:text-lg 2xl:text-xl";

  const updateField = async (values: Record<string, string>) => {
    setFields({ ...values });
    const combined: Record<string, string> = { ...fields, ...values };
    try {
      const res = await sendSignInInfo(combined);
      const accessToken = res.data.accessToken;
      dispatch(login(accessToken));
      return accessToken;
    } catch (error) {
      console.error('Error:', error); // Handle any errors
    }
  }

  return (
    <section className={"fixed z-50 w-screen h-screen top-0 right-0 duration-500 transition-transform ease-in-out " + (signInPage?"translate-y-[0vh]":"translate-y-[100vh]")}> 
      <div className="bg-black w-full h-full py-8 px-8 flex flex-col">
        <div className="flex flex-row justify-between py-3 px-5">
          <div className="w-fit h-fit my-auto">
            <h2 className={signInPage?"animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-3 text-2xl text-white font-bold":""}>
              UW Data Science Club
            </h2>
          </div>
          <GradientBorder rounded="rounded-lg" classes={opacityTrans + "w-fit h-fit " + (signInPage?"opacity-100":"opacity-0")}>
            <Button
              type="button"
              hierarchy="secondary"
              font="font-bold"
              rounded="rounded-[15px]"
              classes="w-full"
              onClick={() => {dispatch(signInMoveDown())}}
            >
              Close
            </Button>
          </GradientBorder>
        </div>
        <div className={opacityTrans + "mx-[10%] mt-[2%] mb-[1%] overflow-hidden h-full " + (signInPage?"opacity-100":"opacity-0")}>
            <div className={"w-[100%] h-full flex flex-row duration-500 transition-transform ease-in-out"}>
              <div className="w-full h-full border-r border-grey3 p-8" >
                <Logo classes="min-w-[70px] w-[30%]"/>
                <h1 className={headings}>Sign in</h1>
                <p className={subTexts}>Already a member? Sign in here to access your profile and membership.</p>
              </div>
              <div className="w-full max-h-full p-8 flex flex-col justify-center overflow-auto" >
                <div className="w-full">
                  <ContactForm
                    title=""
                    id=""
                    includeSideInfo={false}
                    description={<></>}
                    fields={SIGN_IN_FORM_FIELDS}
                    validate={validateSignInForm}
                    onSubmit={updateField}
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
                          Sign in
                        </Button>
                        <p className="text-s text-grey3 p-2 hover:underline cursor-pointer" onClick={()=>{
                          dispatch(signInMoveDown())
                          dispatch(signUpMoveUp())
                        }}>Not a member yet? Join here.</p>
                      </>
                    }
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}