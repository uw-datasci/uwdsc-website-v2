"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { displaySignIn } from "@/store/slices/signInPageSlice";

import Button from "@/components/UI/Button";

export default function Hero() {
  const dispatch = useDispatch();
  const signedIn = useSelector((state: RootState) => state.loginToken.name);

  return (
    <section className="relative flex flex-col h-screen w-full justify-center items-center text-white overflow-hidden">
      {/* bg video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source
          src="/videos/3129957-uhd_3840_2160_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Members (top-left, responsive) */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 lg:top-8 lg:left-8 flex flex-col items-center">
        <div className="px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 text-white text-lg sm:text-xl md:text-3xl lg:text-4xl">
          300
        </div>
        <div className="text-xs sm:text-sm md:text-base lg:text-lg">{`{ MEMBERS }`}</div>
      </div>

      {/* Centered content */}
      <div className="text-center px-4 sm:px-6 flex flex-col gap-6 sm:gap-8 max-w-3xl">
        <h1 className="leading-tight text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">
          University of Waterloo <br /> Data Science Club
        </h1>
        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
          Inspiring the data science leaders of the future by building an
          inclusive community to bridge the gap between academics and the
          industry.
        </p>
      </div>

      {/* Bottom row */}
      <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 w-full px-4 sm:px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Left - Sponsor */}
        <div className="flex justify-center md:justify-start pr-2 sm:pr-4 md:pr-6">
          <p
            className="cursor-pointer text-sm sm:text-base md:text-lg underline hover:underline"
            onClick={() => (window.location.href = "#contact")}
          >
            Sponsor us →
          </p>
        </div>

        {/* Center - Check-in */}
        <div className="flex justify-center">
          {!signedIn ? (
            <button
              onClick={() => dispatch(displaySignIn())}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg md:text-xl font-semibold backdrop-blur-md bg-white/10 border border-white/30 shadow-lg hover:bg-white/20 transition"
            >
              Check in for an event →
            </button>
          ) : (
            <Button
              type="route"
              href="/memCheckIn"
              hierarchy="primary"
              font="font-bold"
              text="text-sm sm:text-base md:text-lg 2xl:text-xl"
              padding="px-6 sm:px-8 py-3 sm:py-4"
              rounded="rounded-2xl"
              classes="backdrop-blur-md bg-white/10 border border-white/30 shadow-lg hover:bg-white/20 transition"
            >
              Check in for an event →
            </Button>
          )}
        </div>

        {/* Right - Events (bottom-right, responsive) */}
        <div className="flex justify-center md:justify-end">
          <div className="flex flex-col items-center">
            <div className="px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 text-white text-lg sm:text-xl md:text-3xl lg:text-4xl">
              0/10
            </div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg">{`{ EVENTS }`}</div>
          </div>
        </div>
      </div>
    </section>
  );
}