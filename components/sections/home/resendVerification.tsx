import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { resendVerification } from "@/utils/apiCalls";
type resendVerificationProps = {
  email: string;
  panelIndex: number;
  setPanelIndex: Dispatch<SetStateAction<number>>;
};

export default function ResendVerificationPage({
  email,
  panelIndex,
  setPanelIndex,
}: resendVerificationProps) {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const headings =
    "mt-0 text-2xl text-center font-bold text-white 3xs:text-3xl 2xs:text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:mx-0 lg:mb-2 lg:max-w-[500px] lg:text-6xl xl:max-w-[540px] xl:text-9xl 2xl:max-w-[580px] 2xl:text-11xl 3xl:max-w-none 3xl:text-13xl";
  const subTexts =
    "leading-loose text-white  sm:text-lg lg:text-md xl:text-lg 2xl:text-xl";
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
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
  }, [panelIndex]);

  const restartTimer = () => {
    setSeconds(60);
    setIsActive(true);
  };

  const handleResend = async () => {
    setIsSubmitting(true);
    try {
      await resendVerification({ email }); // API call to trigger email resend
      setStatusMessage("A new verification email has been sent!");
      restartTimer();
    } catch (error) {
      setStatusMessage(
        "Failed to send verification email. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className={headings}>
        <u>Pay Membership Fee</u> <p className="text-lg">(Not required for CxC)</p>
      </h1>
      <p className={"mt-4 text-left lg:mt-6 " + subTexts}>
        You will have to pay a $4 CAD membership fee through on of the following
        methods:
      </p>
      <p className={"ml-4 text-left lg:ml-6" + subTexts}>
        1. Cash at any our our in-person event or office hours
        <br />
        2. Credit/Debit at the MathSoc office
        <br />
        3. Online{" "}
        <a
          className="bold uppercase underline"
          href="https://wusa.ca/product/uw-data-science-club-membership/"
          target="_blank"
        >
          here
        </a>{" "}
        and email the receipt to dsc@uwaterloo.ca
      </p>
      <hr className="m-4 w-full border-[0.5px] border-b border-grey3 lg:m-8 lg:w-[80%]"></hr>
      {/* <p className={"text-center " + subTexts}>Your verification email was sent to : <u>{email}</u>
        <br/>It usually takes about 1-2 minutes to arrive, please be sure to check your spam !
        <br/>You may try again in {seconds} seconds:
      </p> */}

      <p className={"text-center " + subTexts}>
        You can now log in using the credentials you&apos;ve set.
      </p>

      {/* <Button
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
      </Button> */}

      {statusMessage && (
        <p
          className={
            "mt-4 text-center text-sm " +
            (statusMessage.match("new") ? "text-green" : "text-red")
          }
        >
          {statusMessage}
        </p>
      )}

      <p
        className="text-gray-500 mt-4 cursor-pointer text-grey3 hover:underline"
        onClick={() => setPanelIndex(0)}
      >
        Go back to Sign Up
      </p>
    </div>
  );
}
