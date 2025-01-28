import React, { useState, useEffect } from "react";

type CountdownProps = {
  targetDate: string;
};

export default function Countdown({ targetDate }: CountdownProps) {
  // Helper function to calculate remaining time
  const calculateTimeLeft = () => {
    const now = new Date().getTime(); // Current time in ms
    const target = new Date(targetDate).getTime();
    const difference = target - now;

    if (difference <= 0) {
      // If date is reached or already passed
      return null;
    }

    // Calculate days, hours, minutes, seconds
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  // Initialize state
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return <div>Time&apos;s up!</div>;
  }

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="mx-auto max-w-[350px] text-2xl font-jersey leading-loose tracking-widest text-white xs:max-w-[600px] xs:text-3xl lg:mb-10 2xl:max-w-[640px] 2xl:text-4xl neon-lights">
      <span></span>
      <span>{days}d </span>
      <span>{hours}h </span>
      <span>{minutes}m </span>
      <span>{seconds}s</span>
    </div>
  );
}
