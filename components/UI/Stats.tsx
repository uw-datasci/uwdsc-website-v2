import { useEffect, useRef, useState } from "react";

import SectionTitle from "@/components/UI/SectionTitle";

const ANIMATION_DURATION = 1500;

type statType = {
  stat: number;
  title: string;
};

type inputArguments = {
  inputStats: statType[];
  statTitle: string;
};

export default function Stats(props: inputArguments) {
  const { inputStats, statTitle } = props;
  const [stats, setStats] = useState(Array(inputStats.length).fill(0));
  const statsRef = useRef(stats);
  const sectionRef = useRef(null);
  statsRef.current = stats;

  const animate = () => {
    const interval = 10;
    const incrementSteps = inputStats.map(
      (stat: statType) => stat.stat / (ANIMATION_DURATION / interval)
    );

    const incrementStats = () => {
      const newStats = statsRef.current.map((stat, i) => {
        return Math.min(stat + incrementSteps[i], inputStats[i].stat);
      });
      setStats(newStats);
    };

    const intervalId = setInterval(incrementStats, interval);
    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const currentSectionRef = sectionRef.current;

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  return (
    <section className="mb-section mx-container" ref={sectionRef}>
      <SectionTitle mb="mb-8 lg:mb-12">{statTitle}</SectionTitle>
      <div className="grid gap-14 md:grid-cols-3 max-w-[1080px] mx-auto">
        {inputStats.map((stat: statType, i: number) => (
          <div className="text-center" key={`stat-${i}`}>
            <p className="text-white font-bold text-12xl mb-2 font-display">
              {Math.round(stats[i])}+
            </p>
            <p className="gradient-text bg-gradient-to-b from-white to-[#ffffff80] font-bold text-xl xl:text-2xl">
              {stat.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
