import { useRouter } from "next/router";

import Button from "@/components/UI/Button";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { displaySignIn } from "@/store/slices/signInPageSlice";

type HeroProps = {
  registered: boolean;
  status: string;
};

export default function Hero({ registered, status }: HeroProps) {
  const router = useRouter();
  let dispatch = useDispatch();
  const signedIn = useSelector((state: RootState) => state.loginToken.name);

  return (
    <section className="mx-container mb-section relative mt-[25%]">
      <div className="relative pt-44 text-center lg:pt-56">
        <p className="mx-auto mb-5 max-w-[350px] leading-loose text-white xs:max-w-[600px] xs:text-lg lg:mb-10 2xl:max-w-[640px] 2xl:text-xl">
          Experience CxC - Powered by Federato, Canada&apos;s <b>largest</b>{" "}
          student run hackathon. We are a beginner-friendly datathon that bring
          together students and companies to build projects that solve
          real-world problems.
        </p>
        <div className="flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-12">
          {status == "Selected !" ? (
            <Button
              type="link"
              href="https://docs.google.com/forms/d/e/1FAIpQLScrXCFdxr-gFpClHceTE-em417qQwM7nlQnhKAUOJgUwbRBUA/viewform?usp=sharing"
              classes="ease-in-out"
              hierarchy="primary"
              font="font-bold"
              text="sm:text-lg 2xl:text-xl"
              padding="py-3 sm:px-7 sm:py-4"
              rounded="rounded-lg"
            >
              RSVP Here!
            </Button>
          ) : (
            <Button
              type="button"
              classes="ease-in-out"
              hierarchy="primary"
              font="font-bold"
              text="sm:text-lg 2xl:text-xl"
              padding="py-3 sm:px-7 sm:py-4"
              rounded="rounded-lg"
            >
              Applications closed
            </Button>
          )}

          {/* Commented out during CXC event: */}

          {/* <GradientBorder rounded="rounded-lg">
            <Button
              type="route"
              href="#contact"
              hierarchy="secondary"
              font="font-bold"
              text="sm:text-lg 2xl:text-xl"
              padding="py-3 sm:px-7 sm:py-4"
              rounded="rounded-[15px]"
              classes="w-full"
            >
              Sponsor CxC
            </Button>
          </GradientBorder> */}
        </div>
        {signedIn && registered ? (
          <p className="mx-auto mb-5 mt-2 max-w-[350px] font-jersey leading-loose tracking-widest text-white xs:max-w-[600px] xs:text-lg lg:mb-10 2xl:max-w-[640px] 2xl:text-xl">
            Status: <span className="neon-lights">{status}</span>
          </p>
        ) : (
          <></>
        )}
        {!signedIn && (
          <p
            className="mx-auto mb-5 mt-2 max-w-[350px] cursor-pointer font-jersey leading-loose tracking-widest text-white underline xs:max-w-[600px] xs:text-lg lg:mb-10 2xl:max-w-[640px] 2xl:text-xl"
            onClick={() => dispatch(displaySignIn())}
          >
            Log in to see results
          </p>
        )}
      </div>

      <div className="mt-20 bg-black bg-opacity-80 p-5 font-sans text-lg text-white">
        {status == "Selected !" && (
          <>
            <h2 className="text-responsive-subtitle underline decoration-[2px]">
              Selected!
            </h2>
            <br />
            <p>Hey {signedIn},</p>
            <br />
            <p>
              Congratulations! We’re thrilled to offer you a spot as a hacker at
              CxC 2025! Your application stood out among a highly competitive
              pool, and we can’t wait to see what you bring to this year’s
              event. Make sure to RSVP using the button above by February 3rd at
              11:59pm.
            </p>
            <br />
            <p>
              Stay tuned for more details in the lead up to CxC, including the
              hacker pack and invites to our communication platforms. In the
              meantime, if you have any questions, feel free to reach out.
            </p>
            <br />
            <p>Welcome to CxC 2025—we’re excited to have you on board!</p>
            <br />
            <p>– The CxC Team</p>
          </>
        )}
        {status == "Waitlisted" && (
          <>
            <h2 className="text-responsive-subtitle underline decoration-[2px]">
              Waitlist
            </h2>
            <br />
            <p>Hey {signedIn},</p>
            <br />
            <p>
              Thank you for applying to CxC 2025! We were blown away by the
              number of talented applicants this year, making the selection
              process incredibly competitive. While we were impressed with your
              application, we are unable to offer you an immediate acceptance.
              However, we are excited to place you on our waitlist!
            </p>
            <br />
            <p>
              If a spot opens up, we’ll reach out to let you know before
              February 5th. In the meantime, we appreciate your patience and
              enthusiasm for CxC 2025. Thank you again for applying, and we hope
              to see you at the event!
            </p>
            <br />
            <p>– The CxC Team</p>
          </>
        )}
      </div>
    </section>
  );
}
