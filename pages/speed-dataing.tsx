import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SEO from "@/components/SEO/SEO";

// Event date: February 11, 2026 at 7:00 PM EST
const EVENT_DATE = new Date("2026-02-11T19:00:00-05:00");

// Format helpers
const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

interface FloatingHeartProps {
  delay: number;
  duration: number;
  left: string;
  size: string;
}

// Floating heart component
function FloatingHeart({
  delay,
  duration,
  left,
  size,
}: Readonly<FloatingHeartProps>) {
  return (
    <motion.div
      className={`pointer-events-none absolute bottom-0 ${size} text-valentine-red opacity-60`}
      style={{ left }}
      animate={{
        y: [0, -800],
        opacity: [0, 0.8, 0.6, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    >
      ♥
    </motion.div>
  );
}

interface DataParticleProps {
  delay: number;
  x: string;
  y: string;
}

// Data point particle
function DataParticle({ delay, x, y }: Readonly<DataParticleProps>) {
  return (
    <motion.div
      className="pointer-events-none absolute h-1 w-1 rounded-full bg-valentine-lightPink"
      style={{ left: x, top: y }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
      }}
    />
  );
}

export default function SpeedDataing() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = EVENT_DATE.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <SEO
        title="Speed Dataing | UWaterloo Data Science Club"
        description="Join us for Speed Dataing - a Valentine's themed networking event by the UWaterloo Data Science Club"
        keywords="Speed Dataing,Valentine,Data Science,Networking,UWaterloo"
      />

      <div className="relative min-h-screen overflow-hidden bg-black">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0a0f] to-black" />

        {/* Animated grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #FF174420 1px, transparent 1px),
              linear-gradient(to bottom, #FF174420 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating hearts background */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingHeart delay={0} duration={8} left="10%" size="text-2xl" />
          <FloatingHeart delay={1} duration={10} left="20%" size="text-lg" />
          <FloatingHeart delay={2} duration={9} left="30%" size="text-xl" />
          <FloatingHeart delay={0.5} duration={11} left="40%" size="text-sm" />
          <FloatingHeart delay={3} duration={8} left="50%" size="text-2xl" />
          <FloatingHeart delay={1.5} duration={10} left="60%" size="text-lg" />
          <FloatingHeart delay={2.5} duration={9} left="70%" size="text-xl" />
          <FloatingHeart delay={0.8} duration={12} left="80%" size="text-sm" />
          <FloatingHeart delay={3.5} duration={8} left="90%" size="text-lg" />
        </div>

        {/* Data particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <DataParticle
              key={i}
              delay={i * 0.3}
              x={`${Math.random() * 100}%`}
              y={`${Math.random() * 100}%`}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-32">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 text-center"
          >
            <span className="text-lg font-medium tracking-widest text-valentine-lightPink">
              UWDSC PRESENTS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-center font-display text-6xl font-bold md:text-8xl lg:text-9xl"
          >
            <span className="text-valentine-red">♥</span>
            <span className="bg-gradient-to-r from-valentine-lightRed via-valentine-pink to-valentine-lightRed bg-clip-text text-transparent">
              {" "}
              Speed Dataing{" "}
            </span>
            <span className="text-valentine-red">♥</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12 max-w-xl text-center text-lg text-grey1 md:text-xl"
          >
            Find your perfect match!
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12 grid grid-cols-4 gap-4 md:gap-8"
          >
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Minutes" },
              { value: timeLeft.seconds, label: "Seconds" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-2 rounded-xl bg-valentine-red opacity-20 blur-xl" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-xl border border-valentine-red/30 bg-black/50 backdrop-blur-sm md:h-28 md:w-28 lg:h-32 lg:w-32">
                    <span className="font-display text-3xl font-bold text-valentine-lightRed md:text-5xl lg:text-6xl">
                      {String(item.value).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <span className="md:text-base mt-3 text-sm text-grey2">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Event details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="flex items-center gap-3 text-xl text-white md:text-2xl">
              <span className="text-valentine-pink">📅</span>
              <span>{formatDate(EVENT_DATE)}</span>
            </div>
            <div className="flex items-center gap-3 text-xl text-white md:text-2xl">
              <span className="text-valentine-pink">🕖</span>
              <span>{formatTime(EVENT_DATE)}</span>
            </div>
          </motion.div>

          {/* Decorative data visualization element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <svg width="200" height="60" viewBox="0 0 200 60">
              {/* Heartbeat line */}
              <motion.path
                d="M0,30 L40,30 L50,10 L60,50 L70,20 L80,40 L90,30 L200,30"
                stroke="#FF4081"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </>
  );
}
