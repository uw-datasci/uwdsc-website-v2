import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import Button from "@/components/UI/Button";
import { resendVerification } from "@/utils/apiCalls";
import { moveDown as signUpMoveDown } from "@/store/slices/signUpPageSlice";
type resendVerificationProps = {
  email: string,
  panelIndex: number,
  setPanelIndex: Dispatch<SetStateAction<number>>,
};

export default function ResendVerificationPage({ email, panelIndex, setPanelIndex } : resendVerificationProps) {
  const [statusMessage, setStatusMessage] = useState<string|null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const headings = "mt-0 text-2xl text-center font-bold text-white 3xs:text-3xl 2xs:text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:mx-0 lg:mb-2 lg:max-w-[500px] lg:text-6xl xl:max-w-[540px] xl:text-9xl 2xl:max-w-[580px] 2xl:text-11xl 3xl:max-w-none 3xl:text-13xl";
  const subTexts = "leading-loose text-white  sm:text-lg lg:text-md xl:text-lg 2xl:text-xl";
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  useEffect(() => {
    if (panelIndex == 2) {
      restartTimer();
    }
  }, [panelIndex])

  const restartTimer = () => {
    setSeconds(60);
    setIsActive(true);
  };

  const handleResend = async () => {
    setIsSubmitting(true);
    try {
      await resendVerification({email}); // API call to trigger email resend
      setStatusMessage("A new verification email has been sent!");
      restartTimer()
    } catch (error) {
      setStatusMessage("Failed to send verification email. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className={headings}><u>Verify and Pay</u></h1>
      <p className={"text-left mt-4 lg:mt-6 " + subTexts}>You will have to pay a $4 CAD membership fee through on of the following methods:</p>
      <p className={"text-left ml-4 lg:ml-6" + subTexts}>
        1. Cash at any our our in-person event or office hours
        <br/>2. Credit/Debit at the MathSoc office
        <br/>3. Online <a className="bold uppercase underline" href="https://wusa.ca/product/uw-data-science-club-membership/" target="_blank">here</a> and email the receipt to membership@uwdatascience.ca
      </p>
      <hr className="border-grey3 border-[0.5px] border-b w-full lg:w-[80%] m-4 lg:m-8"></hr>
      <p className={"text-center " + subTexts}>Your verification email was sent to : <u>{email}</u>
        <br/>It usually takes about 1-2 minutes to arrive, please be sure to check your spam !
        <br/>You may try again in {seconds} seconds:
      </p>
      
      <Button
        onClick={handleResend}
        hierarchy="primary"
        type="button"
        font="font-bold"
        text="lg:text-lg"
        padding="py-3 sm:px-7"
        rounded="rounded-lg"
        classes="w-80 m-5"
        disabled={isSubmitting || isActive}
      >
        {isSubmitting ? "Resending..." : (isActive) ? "Please wait...": "Resend Verification Email"}
      </Button>

      {statusMessage && (
        <p className={"mt-4 text-sm text-center " + (statusMessage.match("new") ? "text-green" : "text-red")}>{statusMessage}</p>
      )}
      
      <p className="mt-4 text-gray-500 cursor-pointer hover:underline text-grey3" onClick={() => setPanelIndex(0)}>
        Go back to Sign Up
      </p>
    </div>
  );
}
