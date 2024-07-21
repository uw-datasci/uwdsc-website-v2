import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Button from '@/components/UI/Button';
import GradientBorder from '@/components/UI/GradientBorder';
import { moveDown } from '@/store/slices/signUpPageSlice';
import Logo from '@/components/UI/Logo';
import ContactForm from '../templates/ContactForm';
import { SIGN_UP_FORM_FIELDS_PART1, SIGN_UP_FORM_FIELDS_PART2 } from '@/constants/forms';
import { sendSignUpInfo } from '@/utils/emails';

const opacityTrans = "duration-1000 transition-opacity ease-in-out ";

export default function () {
  const [signUpPart2, setSignUpPart2] = useState(false);
  const [fields, setFields] = useState<Record<string,string>|null>(null);
  const signUpPage = useSelector((state: RootState) => state.signUpPage.value);
  const dispatch = useDispatch();
  const headings = "mt-10 text-2xl font-bold text-white 3xs:text-3xl 2xs:max-w-[390px] 2xs:text-4xl xs:max-w-[450px] xs:text-5xl sm:text-6xl md:max-w-[520px] md:text-7xl lg:mx-0 lg:mb-7 lg:max-w-[500px] lg:text-left lg:text-6xl xl:max-w-[540px] xl:text-9xl 2xl:max-w-[580px] 2xl:text-11xl 3xl:max-w-none 3xl:text-13xl";
  const subTexts = "mt-2 max-w-[350px] text-center leading-loose text-white sm:max-w-[420px] sm:text-lg lg:mx-0 lg:mb-14 lg:max-w-none lg:text-left lg:text-md xl:text-lg 2xl:text-xl";
  let fieldss: Record<string, string> = {};

  const updatePart1Field = async (values: Record<string, string>) => {
    setFields({...values});
    setSignUpPart2(!signUpPart2);
  }

  const updatePart2Field = async (values: Record<string, string>) => {
    const combined: Record<string, string> = {...fields, ...values};
    return sendSignUpInfo(combined);
  }

  return (
    <section className={"fixed z-50 w-screen h-screen top-0 right-0 duration-500 transition-transform ease-in-out " + (signUpPage?"translate-y-[0vh]":"translate-y-[100vh]")}> 
      <div className="bg-black w-full h-full py-8 px-8 flex flex-col">
        <div className="flex flex-row justify-between py-3 px-5">
          <div className="w-fit h-fit my-auto">
            <h2 className={signUpPage?"animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-3 text-2xl text-white font-bold":""}>
              UW Data Science Club
            </h2>
          </div>
          <GradientBorder rounded="rounded-lg" classes={opacityTrans + "w-fit h-fit " + (signUpPage?"opacity-100":"opacity-0")}>
            <Button
              type="button"
              hierarchy="secondary"
              font="font-bold"
              rounded="rounded-[15px]"
              classes="w-full"
              onClick={() => {dispatch(moveDown())}}
            >
              Close
            </Button>
          </GradientBorder>
        </div>
        <div className={opacityTrans + "mx-[10%] mt-[2%] mb-[1%] overflow-hidden h-full " + (signUpPage?"opacity-100":"opacity-0")}>
            <div className={"w-[200%] h-full flex flex-row duration-500 transition-transform ease-in-out " + (signUpPart2 ? "translate-x-[-50%]" : "translate-x-[0]")}>
              <div className="w-full h-full border-r border-grey3 p-8" >
                <Logo classes="min-w-[70px] w-[30%]"/>
                <h1 className={headings}>Join Us !</h1>
                <p className={subTexts}>Become a part of a growing community of data science enthusiasts and participate in engaging discussions, hands-on projects, and networking opportunities.</p>
              </div>
              <div className="w-full max-h-full p-8 flex flex-col justify-center" >
                <div className="w-full">
                  <ContactForm
                    title=""
                    includeSideInfo={false}
                    description={<></>}
                    fields={SIGN_UP_FORM_FIELDS_PART1}
                    validate={(values: Record<string, string>)=>{
                      const errors: Record<string, string> = {};
                      return errors;
                    }}
                    onSubmit={updatePart1Field}
                    buttonClasses="w-full"
                  />
                </div>
              </div>
              <div className="w-full h-full border-r border-grey3 p-8 " >
                <h1 className={headings/*"text-13xl text-white font-bold mt-10"*/}>Almost There !</h1>
                <p className={subTexts/*"text-2xl text-white font-bold mt-2"*/}>Once you have submitted, you should receive a confirmation email to your uwaterloo email account.<br/><br/>And after all that hard work . . . <br/> Welcome to the club !</p>
              </div>
              <div className="w-full h-full p-8 flex flex-col justify-center" >
                <div className="w-full max-h-full">
                  <ContactForm
                      title=""
                      includeSideInfo={false}
                      description={<></>}
                      fields={SIGN_UP_FORM_FIELDS_PART2}
                      validate={(values: Record<string, string>)=>{
                        const errors: Record<string, string> = {};
                        return errors;
                      }}
                      onSubmit={updatePart2Field}
                      buttonClasses="w-full"
                    />
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}