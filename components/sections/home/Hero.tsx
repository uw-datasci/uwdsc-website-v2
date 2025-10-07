import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { displaySignIn } from "@/store/slices/signInPageSlice";
import { displaySignUp } from "@/store/slices/signUpPageSlice";
import { logout } from "@/store/slices/loginTokenSlice";
import { RootState } from "@/store/store";
import { useEffect, useState, useRef, useCallback } from "react";
import { getPaidUsers } from "@/utils/apiCalls/userApiCalls";
import { getEvents } from "@/utils/apiCalls/eventApiCalls";

const ANIMATION_DURATION = 1500;
const INTERVAL = 10;

export default function Hero() {
  const dispatch = useDispatch();
  const router = useRouter();
  const signedIn = useSelector((state: RootState) => state.loginToken.name);

  // === Animation State for Members & Events ===
  const [members, setMembers] = useState(0);
  const [events, setEvents] = useState(0);
  const [membersTarget, setMembersTarget] = useState(300); // Use 300 if failed to fetch
  const [eventsTarget, setEventsTarget] = useState(0); // Will be updated with real data
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

  // Fetch real member data on component mount
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await getPaidUsers();
        const memberCount = response.data.length;
        setMembersTarget(Math.round(memberCount / 10) * 10);
      } catch (error) {
        console.error("Failed to fetch member data:", error);
        // Keep the default value if API fails
      }
    };

    fetchMemberData();
  }, []);

  // Fetch real events data on component mount
  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        // Get all events (past and future) to get total count
        const response = await getEvents();
        const eventsCount = response.data.events.length;
        setEventsTarget(Math.round(eventsCount / 10) * 10);
      } catch (error) {
        console.error("Failed to fetch events data:", error);
        // Keep the default value if API fails
      }
    };

    fetchEventsData();
  }, []);

  useEffect(() => {
    let intervalId: number | NodeJS.Timeout;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          intervalId = animateStats();
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
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
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden text-center text-white"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover "
      >
        <source
          src="/videos/3129957-uhd_3840_2160_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Title + Description */}
      <div className="z-10 mt-20 flex max-w-3xl flex-col gap-6 px-6 sm:gap-10">
        <h1 className="text-4xl font-bold sm:text-7xl md:text-[4rem]">
          University of Waterloo <br /> Data Science Club
        </h1>
        <p className="mx-auto max-w-2xl text-sm sm:text-xl">
          Inspiring the data science leaders of the future by building an
          inclusive community to bridge the gap between academics and the
          industry.
        </p>
      </div>

      {/* Logined as Mobile */}
      <div className="mt-4 block md:hidden">
        {signedIn && (
          <div className="flex items-center gap-4">
            <p className="p-2 text-sm text-grey2">
              Logged in as <b>{signedIn}</b>
            </p>
            <button
              onClick={() => {
                dispatch(logout());
                router.push("/");
              }}
              className="text-sm text-grey2 hover:underline"
            >
              ( Log Out )
            </button>
          </div>
        )}
      </div>

      {/* Check-in button */}
      <div className="z-10 mt-6 sm:mt-10">
        <button
          onClick={() => {
            if (signedIn) {
              router.push("/memCheckIn");
            } else {
              dispatch(displaySignIn());
            }
          }}
          className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-xl 
                     font-medium shadow-lg backdrop-blur-md transition hover:bg-white/20 
                     sm:px-10 sm:py-5"
        >
          Check in for an event →
        </button>
      </div>

      {/* login/logout mobile 
      <div className="block md:hidden flex items-center gap-8 sm:gap-4 text-white">
        {!signedIn ? (
          <>
            <button
              onClick={() => dispatch(displaySignIn())}
              className="text-lg hover:underline"
            >
              ( LOGIN )
            </button>
            <button
              onClick={() => dispatch(displaySignUp())}
              className="text-lg hover:underline"
            >
              ( JOIN US )
            </button>
          </>
          
        ) : (
          <>
            <button
              onClick={() => {
                dispatch(logout());
                router.push("/");
              }}
              className="text-lg hover:underline"
            >
              ( Log Out )
            </button>
          </>
        )}
      </div>
      */}

      {/* Sponsor Us For Iphone*/}
      <div
        className="hover:text-gray-300 mt-6 text-lg hover:cursor-pointer hover:underline md:absolute md:bottom-24 md:left-6 md:mb-0 md:text-2xl"
        onClick={() => (window.location.href = "#contact")}
      >
        Sponsor us →
      </div>

      {/* Animated Stats in Hero */}
      {/* Members (top-left, moved lower) */}
      <div className="absolute left-3 top-24 flex flex-col items-center sm:left-6 sm:top-28">
        <div className="px-2 py-0.5 text-4xl text-white sm:px-3 sm:py-1 md:px-4 md:text-5xl lg:text-7xl">
          {Math.round(members)}+
        </div>
        <div className="text-lg md:text-lg lg:text-2xl">{`{ MEMBERS }`}</div>
      </div>

      {/* Events (bottom-right, moved higher) */}
      <div className="absolute bottom-12 right-3 flex flex-col items-end sm:bottom-24 sm:right-6">
        <div className="text-4xl text-white md:text-5xl lg:text-7xl">
          {Math.round(events)}+
        </div>
        <div className="md:text-xlg text-lg lg:text-2xl">{`{ EVENTS }`}</div>
      </div>
    </section>
  );
}
