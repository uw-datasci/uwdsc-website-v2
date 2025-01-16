import { useRouter } from "next/router";

import Button from "@/components/UI/Button";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { moveUp as signInMoveUp } from "@/store/slices/signInPageSlice";

type HeroProps = {
  registered: boolean;
};

export default function Hero({ registered }: HeroProps) {
  const router = useRouter();
  let dispatch = useDispatch();
  const signedIn = useSelector((state: RootState) => state.loginToken.name);

  const handleButtonClick = () => {
    if (signedIn) {
      router.push("/registration/cxc");
    } else {
      dispatch(signInMoveUp());
    }
  };

  return (
    <section className="mx-container mb-section relative mt-[25%]">
      <div className="relative pt-44 text-center lg:pt-56">
        <p className="mx-auto mb-5 max-w-[350px] leading-loose text-white xs:max-w-[600px] xs:text-lg lg:mb-10 2xl:max-w-[640px] 2xl:text-xl">
          Experience CxC - Powered by Federato, Canada&apos;s <b>largest</b> student
          run hackathon. We are a beginner-friendly datathon that bring together students and companies to build
          projects that solve real-world problems.
        </p>
        <p className="mx-auto mb-5 max-w-[350px] leading-loose text-white xs:max-w-[600px] xs:text-lg lg:mb-10 2xl:max-w-[640px] 2xl:text-xl">
          Applications close January 24th, 2025
        </p>
        <div className="flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-12">
          <Button
            type="button"
            onClick={handleButtonClick}
            classes="ease-in-out"
            hierarchy="primary"
            font="font-bold"
            text="sm:text-lg 2xl:text-xl"
            padding="py-3 sm:px-7 sm:py-4"
            rounded="rounded-lg"
          >
            {signedIn
              ? registered
                ? "Update application"
                : "Apply now!"
              : "Sign in to apply!"}
          </Button>

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
      </div>
    </section>
  );
}
