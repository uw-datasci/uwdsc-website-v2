import { useEffect, useState, useRef, useCallback } from "react";

import SectionTitle from "@/components/UI/SectionTitle";

import { Stat } from "@/types/types";

const ANIMATION_DURATION = 1500;
const INTERVAL = 10;

type StatsProps = {
  title: string;
  stats: Stat[];
};

export default function Stats({ title, stats }: StatsProps) {
  const [curStats, setCurStats] = useState<number[]>(
    Array(stats.length).fill(0),
  );
  const sectionRef = useRef<HTMLElement | null>(null);

  const animateStats = useCallback(() => {
    const incrementSteps = stats.map(
      (stat) => stat.stat / (ANIMATION_DURATION / INTERVAL),
    );

    const intervalId = setInterval(() => {
      setCurStats((prevStats) => {
        const newStats = prevStats.map((stat, i) =>
          Math.min(stat + incrementSteps[i], stats[i].stat),
        );

        const animationCompleted = newStats.every(
          (val, idx) => val >= stats[idx].stat,
        );

        if (animationCompleted) {
          clearInterval(intervalId);
        }

        return newStats;
      });
    }, INTERVAL);

    return intervalId;
  }, [stats]);

  useEffect(() => {
    let intervalId: number | NodeJS.Timeout;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          intervalId = animateStats();
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    );

    const currentSectionRef = sectionRef.current;

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [animateStats]);

  return (
    <section className="mb-section mx-container" ref={sectionRef}>
      <SectionTitle mb="mb-8 lg:mb-12">{title}</SectionTitle>
      <div className="grid gap-14 md:grid-cols-3">
        {stats.map((stat, i) => (
          <div className="text-center" key={stat.id}>
            <p className="mb-2 font-display text-12xl font-bold text-white">
              {Math.round(curStats[i])}
              {stat.suffix}
            </p>
            <p className="gradient-text bg-gradient-to-b from-white to-[#ffffff80] text-xl font-bold xl:text-2xl">
              {stat.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
