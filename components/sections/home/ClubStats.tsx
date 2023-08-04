import { useEffect, useRef, useState } from 'react';

import SectionTitle from '@/components/UI/SectionTitle';

const STATS = [
  {
    title: 'Workshops Held',
    stat: 100,
  },
  {
    title: 'Current Members',
    stat: 400,
  },
  {
    title: 'Recruiting Events Held',
    stat: 100,
  },
];
const ANIMATION_DURATION = 1000;

export default function ClubStats() {
  const [stats, setStats] = useState(Array(STATS.length).fill(0));
  const statsRef = useRef(stats);
  statsRef.current = stats;

  useEffect(() => {
    const interval = 10;
    const incrementSteps = STATS.map(
      (stat) => stat.stat / (ANIMATION_DURATION / interval)
    );

    const incrementStats = () => {
      const newStats = statsRef.current.map((stat, i) => {
        return Math.min(stat + incrementSteps[i], STATS[i].stat);
      });
      setStats(newStats);
    };

    const intervalId = setInterval(incrementStats, interval);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className='mb-section mx-container'>
      <SectionTitle mb='mb-8 lg:mb-12'>CLUB STATS</SectionTitle>
      <div className='grid gap-14 md:grid-cols-3 max-w-[1080px] mx-auto'>
        {STATS.map((stat, i) => (
          <div className='text-center' key={`stat-${i}`}>
            <p className='text-white font-bold text-12xl mb-2 font-display'>
              {Math.round(stats[i])}+
            </p>
            <p className='gradient-text bg-gradient-to-b from-white to-[#ffffff80] font-bold text-xl xl:text-2xl'>
              {stat.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
