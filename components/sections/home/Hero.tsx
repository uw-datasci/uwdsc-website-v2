import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { displaySignIn } from "@/store/slices/signInPageSlice";
import { RootState } from "@/store/store";
import { useEffect, useState, useRef, useCallback } from "react";

const ANIMATION_DURATION = 1500;
const INTERVAL = 10;

export default function Hero() {
  const dispatch = useDispatch();
  const router = useRouter();
  const signedIn = useSelector((state: RootState) => state.loginToken.name);

  // === Animation State for Members & Events ===
  const [members, setMembers] = useState(0);
  const [events, setEvents] = useState(0);
  const membersTarget = 300; // your real number here
  const eventsTarget = 100; // your real number here
  const sectionRef = useRef<HTMLElement | null>(null);

  const animateStats = useCallback(() => {
    const memberStep = membersTarget / (ANIMATION_DURATION / INTERVAL);
    const eventStep = eventsTarget / (ANIMATION_DURATION / INTERVAL);

    const intervalId = setInterval(() => {
      setMembers((prev) => Math.min(prev + memberStep, membersTarget));
      setEvents((prev) => Math.min(prev + eventStep, eventsTarget));

      if (members >= membersTarget && events >= eventsTarget) {
        clearInterval(intervalId);
      }
    }, INTERVAL);

    return intervalId;
  }, [membersTarget, eventsTarget, members, events]);

  useEffect(() => {
    let intervalId: number | NodeJS.Timeout;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          intervalId = animateStats();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      if (intervalId) clearInterval(intervalId);
    };
  }, [animateStats]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden"
    >
      {/* Background Video */}
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

      {/* Title + Description */}
      <div className="z-10 max-w-3xl px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          University of Waterloo <br /> Data Science Club
        </h1>
        <p className="text-sm sm:text-base md:text-lg mb-8">
          Inspiring the data science leaders of the future by building an
          inclusive community to bridge the gap between academics and the
          industry.
        </p>
      </div>

      {/* Check-in button */}
      <div className="z-10 mb-6">
        <button
          onClick={() => {
            if (signedIn) {
              router.push("/memCheckIn");
            } else {
              dispatch(displaySignIn());
            }
          }}
          className="px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl font-medium 
          backdrop-blur-md bg-white/10 border border-white/30 shadow-lg 
          hover:bg-white/20 transition"
        >
          Check in for an event →
        </button>
      </div>

      {/* Animated Stats in Hero */}
      {/* Members (top-left, moved lower) */}
      <div className="absolute top-28 left-3 sm:left-6 flex flex-col items-center">
        <div className="px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 text-white text-lg sm:text-xl md:text-3xl lg:text-4xl">
          {Math.round(members)}+
        </div>
        <div className="text-xs sm:text-sm md:text-base lg:text-lg">
          {`{ MEMBERS }`}
        </div>
      </div>

      {/* Events (bottom-right, moved higher) */}
      <div className="absolute bottom-24 right-3 sm:right-6 flex flex-col items-center">
        <div className="px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 text-white text-lg sm:text-xl md:text-3xl lg:text-4xl">
          {Math.round(events)}+
        </div>
        <div className="text-xs sm:text-sm md:text-base lg:text-lg">
          {`{ WORKSHOPS }`}
        </div>
      </div>

      {/* Sponsor Us (moved higher) */}
      <div className="absolute bottom-28 left-3 sm:left-6">
        <a
          href="/sponsor"
          className="text-xs sm:text-sm md:text-base underline hover:text-gray-300"
        >
          Sponsor us →
        </a>
      </div>
    </section>
  );
}
