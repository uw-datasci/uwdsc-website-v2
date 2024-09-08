// React/Redux Imports
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

// UI Imports
import Button from "@/components/UI/Button";
import Logo from "@/components/UI/Logo";

// Form Imports
import PopUpPanels from "../templates/PopUpPanels";
import { moveDown as signUpMoveDown } from "@/store/slices/signUpPageSlice";
import { moveUp as signInMoveUp } from "@/store/slices/signInPageSlice";
import ContactForm from "../templates/ContactForm";
import { SIGN_UP_FORM_FIELDS_PART1, SIGN_UP_FORM_FIELDS_PART2 } from "@/constants/forms";
import { validateSignUpFormPart1, validateSignUpFormPart2 } from "@/utils/formValidation";
import { sendSignUpInfo } from "@/utils/api-calls";

export default function SignUpPage() {
  const [panelIndex, setPanelIndex] = useState<number>(0);
  const [fields, setFields] = useState<Record<string,string>|null>(null);
  const signUpPage = useSelector((state: RootState) => state.signUpPage.value);
  const dispatch = useDispatch();
  const headings = "mt-0 text-2xl font-bold text-white 3xs:text-3xl 2xs:text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:mt-10 lg:mx-0 lg:mb-7 lg:max-w-[500px] 3xs:text-center lg:text-left lg:text-6xl xl:max-w-[540px] xl:text-9xl 2xl:max-w-[580px] 2xl:text-11xl 3xl:max-w-none 3xl:text-13xl";
  const subTexts = "mt-2 text-center leading-loose text-white  sm:text-lg lg:mx-0 lg:mb-14 lg:text-left lg:text-md xl:text-lg 2xl:text-xl";

  var part1Formik: { resetForm : () => void };

  const updatePart1Field = async (values: Record<string, string>) => {
    setFields({...values});
    setPanelIndex(1);
  }

  const updatePart2Field = async (values: Record<string, string>) => {
    const combined: Record<string, string> = {...fields, ...values};
    return sendSignUpInfo(combined);
  }

  const getFormik = (formik: any) => {
    part1Formik = formik;
  }

  const part2SuccessCallback = () => {
    part1Formik.resetForm();
  }

  return (
    <PopUpPanels isPopUp={signUpPage}  moveDownFunc={() => {dispatch(signUpMoveDown())}} panelIndex={panelIndex}
      panels={
        [ 
          <>
            <div className="w-full flex flex-col lg:flex-row overflow-auto no-scrollbar lg:overflow-hidden">  
              <div className="w-full h-fit border-r lg:border-grey3 lg:p-8 lg:my-auto">
                <Logo classes="3xs:hidden lg:block lg:min-w-[70px] w-[30%]"/>
                <h1 className={headings}>Join Us !</h1>
                <p className={subTexts}>Become a part of a growing community of data science enthusiasts and participate in engaging discussions, hands-on projects, and networking opportunities.</p>
              </div>
              <div className="w-full max-h-full py-10 lg:p-8 flex flex-col justify-center lg:overflow-auto">
                <div className="w-full">
                  <ContactForm
                    title=""
                    id=""
                    getFormik={getFormik}
                    includeSideInfo={false}
                    description={<></>}
                    fields={SIGN_UP_FORM_FIELDS_PART1}
                    validate={validateSignUpFormPart1}
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
                        <p className="text-s text-grey3 p-2 hover:underline cursor-pointer" onClick={()=>{
                          dispatch(signUpMoveDown());  // hide sign-up
                          dispatch(signInMoveUp());   // show sign-in
                        }}>Already a member? Sign in here.</p>
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          </>,
          <>
            <div className="w-full flex flex-col lg:flex-row overflow-auto no-scrollbar lg:overflow-hidden">  
              <div className="w-full h-fit border-r lg:border-grey3 lg:p-8 lg:my-auto" >
                <h1 className={headings}>Almost There !</h1>
                <p className={subTexts}>Once you have submitted, you should receive a confirmation email to your uwaterloo email account.<br/><br/>And after all that hard work ... <br/> Welcome to the club !</p>
              </div>
              <div className="w-full max-h-full py-10 lg:p-8 flex flex-col justify-center lg:overflow-auto" >
                <div className="w-full">
                  <ContactForm
                      title=""
                      id=""
                      includeSideInfo={false}
                      description={<></>}
                      fields={SIGN_UP_FORM_FIELDS_PART2}
                      validate={validateSignUpFormPart2}
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
                          <p className="text-s text-grey3 p-2 hover:underline cursor-pointer" onClick={()=>{setPanelIndex(0)}}>Go back</p>
                        </>
                      }
                    />
                </div>
              </div>
            </div>
          </>
        ]}
    />
  );
}

// <div className="w-full flex flex-col lg:flex-row overflow-auto no-scrollbar lg:overflow-hidden">  
//                 <div className="w-full h-fit border-r lg:border-grey3 lg:p-8 lg:my-auto">
//                   <Logo classes="3xs:hidden lg:block lg:min-w-[70px] w-[30%]"/>
//                   <h1 className={headings}>Join Us !</h1>
//                   <p className={subTexts}>Become a part of a growing community of data science enthusiasts and participate in engaging discussions, hands-on projects, and networking opportunities.</p>
//                 </div>
//                 <div className="w-full max-h-full py-10 lg:p-8 flex flex-col justify-center lg:overflow-auto">
//                   <div className="w-full">
//                     <ContactForm
//                       title=""
//                       id=""
//                       getFormik={getFormik}
//                       includeSideInfo={false}
//                       description={<></>}
//                       fields={SIGN_UP_FORM_FIELDS_PART1}
//                       validate={validateSignUpFormPart1}
//                       onSubmit={updatePart1Field}
//                       successMessage=""
//                       errorMessage=""
//                       resetForm={false}
//                       formClasses="mx-container "
//                       inputFeedbackClasses="mt-1 pl-6 mb-[-0.5rem] leading-relaxed text-s "
//                       customButton={
//                         <>
//                           <Button
//                             type="submit"
//                             hierarchy="primary"
//                             font="font-bold"
//                             text="lg:text-lg"
//                             padding="py-3 sm:px-7"
//                             rounded="rounded-lg"
//                             classes="w-full"
//                           >
//                             Sign Up!
//                           </Button>
//                           <p className="text-s text-grey3 p-2 hover:underline cursor-pointer" onClick={()=>{
//                             dispatch(signUpMoveDown());  // hide sign-up
//                             dispatch(signInMoveUp());   // show sign-in
//                           }}>Already a member? Sign in here.</p>
//                         </>
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>
              // <div className="w-full flex flex-col lg:flex-row overflow-auto no-scrollbar lg:overflow-hidden">  
              //   <div className="w-full h-fit border-r lg:border-grey3 lg:p-8 lg:my-auto" >
              //     <h1 className={headings}>Almost There !</h1>
              //     <p className={subTexts}>Once you have submitted, you should receive a confirmation email to your uwaterloo email account.<br/><br/>And after all that hard work ... <br/> Welcome to the club !</p>
              //   </div>
              //   <div className="w-full max-h-full py-10 lg:p-8 flex flex-col justify-center lg:overflow-auto" >
              //     <div className="w-full">
              //       <ContactForm
              //           title=""
              //           id=""
              //           includeSideInfo={false}
              //           description={<></>}
              //           fields={SIGN_UP_FORM_FIELDS_PART2}
              //           validate={validateSignUpFormPart2}
              //           onSubmit={updatePart2Field}
              //           errorMessage="Something went wrong. Please let us know and try again later."
              //           successMessage="Successfully registered. Check your email!"
              //           successCallback={part2SuccessCallback}
              //           resetForm={true}
              //           formClasses="mx-container "
              //           inputFeedbackClasses="mt-1 pl-1 leading-relaxed text-s "
              //           customButton={
              //             <>
              //               <Button
              //                 type="submit"
              //                 hierarchy="primary"
              //                 font="font-bold"
              //                 text="lg:text-lg"
              //                 padding="py-3 sm:px-7"
              //                 rounded="rounded-lg"
              //                 classes="w-full"
              //               >
              //                 Submit
              //               </Button>
              //               <p className="text-s text-grey3 p-2 hover:underline cursor-pointer" onClick={()=>{setSignUpPart2(!setSignUpPart2)}}>Go back</p>
              //             </>
              //           }
              //         />
              //     </div>
              //   </div>
              // </div>