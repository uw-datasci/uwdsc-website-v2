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
  console.log(registered);
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
        {signedIn && status == "Confirmed" && (
          <>
            <h2 className="text-responsive-subtitle underline decoration-[2px]">
              Confirmed
            </h2>
            <br />
            <p>Hi {signedIn},</p>
            <br />
            <p>
              Congratulations! Your RSVP for CxC 2025 has been successfully
              completed. 🎉 You’ll soon receive an email with everything you
              need to know, including the Hacker Guide and an invitation to our
              Discord community.
            </p>
            <br />
            <p>
              To check in on the morning of February 8th, please have your QR
              code ready – you can access it{" "}
              <a
                className="text-blue underline"
                href="https://www.uwdatascience.ca/qrPage"
              >
                here.
              </a>
            </p>
            <br />
            <p>
              If you have any questions, feel free to reach out to us at
              contact@uwdatascience.ca. We’re excited to see you at CxC 2025!
            </p>
            <br />
            <p>Best,</p>
            <p>– The CxC Team</p>
          </>
        )}
        {signedIn && status == "RSVP expired" && (
          <>
            <h2 className="text-responsive-subtitle underline decoration-[2px]">
              RSVP Expired
            </h2>
            <br />
            <p>Hi {signedIn},</p>
            <br />
            <p>
              Our records show that you did not complete the RSVP form by the
              February 3rd deadline, which means we will not be expecting you at
              CxC 2025.
            </p>
            <br />
            <p>
              We host this event annually, and we’d love to see you apply again
              in the future! Keep an eye on our upcoming events by following
              @uwaterloodsc on Instagram.
            </p>
            <br />
            <p>Best,</p>
            <p>– The CxC Team</p>
          </>
        )}
        {signedIn && status == "Not Selected" && (
          <>
            <h2 className="text-responsive-subtitle underline decoration-[2px]">
              Not Selected
            </h2>
            <br />
            <p>Hi {signedIn},</p>
            <br />
            <p>
              Unfortunately, we’ve now reached full capacity for this year’s CxC
              data hackathon, and we’re unable to offer you a spot at our
              hackathon. Every year, we receive an overwhelming number of strong
              applications, and this year was no exception. We truly appreciate
              your time and encourage you to apply again next year. Due to
              strict event capacity limits, we will not be accepting walk-in
              participants.
            </p>
            <br />
            <p>
              That said, we’d love for you to stay involved in Waterloo’s data
              science community! Join us at UWDSC’s Squid Game event on February
              9th at 1:30 PM in E7, featuring food, funnel cakes, prizes, and
              exciting games 🚀. Follow us on Instagram (@uwaterloodsc) to stay
              updated on future events.
            </p>
            <br />
            <p>Thank you again for your interest in CxC.</p>
            <br />
            <p>– The CxC Team</p>
          </>
        )}
      </div>
    </section>
  );
}
