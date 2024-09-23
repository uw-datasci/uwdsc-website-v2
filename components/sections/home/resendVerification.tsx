import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import Button from "@/components/UI/Button";
import { resendVerification } from "@/utils/api-calls";
import { moveDown as signUpMoveDown } from "@/store/slices/signUpPageSlice";
type resendVerificationProps = {
  email: string,
  setPanelIndex: Dispatch<SetStateAction<number>>,
};

export default function ResendVerificationPage({ email, setPanelIndex } : resendVerificationProps) {
  const [statusMessage, setStatusMessage] = useState<string|null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();
  const headings = "mt-0 text-2xl text-center font-bold text-white 3xs:text-3xl 2xs:text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:mt-10 lg:mx-0 lg:mb-7 lg:max-w-[500px] lg:text-6xl xl:max-w-[540px] xl:text-9xl 2xl:max-w-[580px] 2xl:text-11xl 3xl:max-w-none 3xl:text-13xl";
  const subTexts = "mt-2 text-center leading-loose text-white  sm:text-lg lg:mx-0 lg:text-md xl:text-lg 2xl:text-xl";
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
      <h1 className={headings}>Verification email sent to : <u>{email}</u></h1>
      <p className={subTexts}>It usually takes about 1-2 minutes to arrive, please be sure to check your spam !<br/>You may try again in {seconds} seconds:</p>
      
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
