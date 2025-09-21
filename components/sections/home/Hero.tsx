import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { displaySignIn } from "@/store/slices/signInPageSlice";
import { RootState } from "@/store/store";

export default function Hero() {
  const dispatch = useDispatch();
  const router = useRouter();
  const signedIn = useSelector((state: RootState) => state.loginToken.name);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden">
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

      {/*title + desc*/}
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

      {/* check-in button */}
      <div className="z-10 mb-8">
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

      {/* member count */}
      <div className="absolute top-28 left-3 sm:left-6 flex flex-col items-center">
        <div className="px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 text-white text-lg sm:text-xl md:text-3xl lg:text-4xl">
          300
        </div>
        <div className="text-xs sm:text-sm md:text-base lg:text-lg">{`{ MEMBERS }`}</div>
      </div>

      {/* event count */}
      <div className="absolute bottom-24 right-3 sm:right-6 flex flex-col items-center">
        <div className="px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 text-white text-lg sm:text-xl md:text-3xl lg:text-4xl">
          0/10
        </div>
        <div className="text-xs sm:text-sm md:text-base lg:text-lg">{`{ EVENTS }`}</div>
      </div>

      {/* sponsor us */}
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
