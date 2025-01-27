import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { moveUp as moveUpSignUp } from "@/store/slices/signUpPageSlice";
import { moveUp as moveUpSignIn} from "@/store/slices/signInPageSlice";

import Button from "@/components/UI/Button";
import GradientBorder from "@/components/UI/GradientBorder";

import officeOpen from "@/public/graphics/office-open.png";
import { logout } from "@/store/slices/loginTokenSlice";

export default function Hero() {
  const dispatch = useDispatch();
  const signedIn = useSelector((state: RootState) => state.loginToken.name);

  return (
    <section className="mb-section mx-container mt-14 grid gap-16 lg:mt-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,3fr)] ">
      <div>
        <h1 className="mx-auto mb-5 text-center text-2xl font-bold text-white 3xs:text-3xl 2xs:max-w-[390px] 2xs:text-4xl xs:max-w-[450px] xs:text-5xl sm:text-6xl md:max-w-[520px] md:text-7xl lg:mx-0 lg:mb-7 lg:max-w-[500px] lg:text-left lg:text-6xl xl:max-w-[540px] xl:text-9xl 2xl:max-w-[580px] 2xl:text-10xl 3xl:max-w-none 3xl:text-12xl">
          University of Waterloo Data Science Club
        </h1>
        <p className="mx-auto mb-10 max-w-[350px] text-center leading-loose text-white sm:max-w-[420px] sm:text-lg lg:mx-0 lg:mb-14 lg:max-w-none lg:text-left lg:text-md xl:text-lg 2xl:text-xl">
          Inspiring the data science leaders of the future by building an
          inclusive community to bridge the gap between academics and the
          industry.
        </p>
        <div className="flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-12 lg:justify-start">
          {!signedIn ? 
            <>
              <Button
                type="button"
                hierarchy="primary"
                font="font-bold"
                text="sm:text-lg 2xl:text-xl"
                padding="py-3 sm:px-7 sm:py-4"
                rounded="rounded-lg"
                classes="lg:hidden"
                onClick={() => {dispatch(moveUpSignUp())}}
              >
                Join Us
              </Button>
              <Button
                type="button"
                hierarchy="primary"
                font="font-bold"
                text="sm:text-lg 2xl:text-xl"
                padding="py-3 sm:px-7 sm:py-4"
                rounded="rounded-lg"
                classes="lg:hidden"
                onClick={() => {dispatch(moveUpSignIn())}}
              >
                Log in
              </Button>
            </>
          : <>
              <p className="text-s text-grey3 text-center lg:hidden">Logged in as <b>{signedIn}</b></p>
              <Button
                type="button"
                hierarchy="primary"
                font="font-bold"
                text="sm:text-lg 2xl:text-xl"
                padding="py-3 sm:px-7 sm:py-4"
                rounded="rounded-lg"
                classes="lg:hidden"
                onClick={() => {dispatch(logout())}}
              >
                Log out
              </Button>
              <Button
                type="route"
                hierarchy="primary"
                href="/qrPage"
                font="font-bold"
                text="sm:text-lg 2xl:text-xl"
                padding="py-3 sm:px-7 sm:py-4"
                rounded="rounded-lg"
                classes="hidden lg:block"
              >
                QR Code
              </Button>
            </>
            
            }
          <GradientBorder rounded="rounded-lg">
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
              Sponsor Us
            </Button>
          </GradientBorder>
        </div>
      </div>
      <Image
        src={officeOpen}
        alt="office open"
        className="mx-auto xs:max-w-[360px] lg:mx-0 lg:w-full lg:max-w-none"
      />
    </section>
  );
}
