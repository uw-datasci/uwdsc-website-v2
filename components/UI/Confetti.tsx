import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Confetti piece component
const ConfettiPiece = ({
  delay,
  x,
  y,
  color,
  size,
}: {
  delay: number;
  x: number;
  y: number;
  color: string;
  size: number;
}) => (
  <motion.div
    className={`absolute rounded-full ${color}`}
    style={{ width: size, height: size }}
    initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
    animate={{
      x: x,
      y: y,
      opacity: 0,
      scale: 0,
      rotate: Math.random() * 720,
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      delay,
      ease: "easeOut",
    }}
  />
);

// Confetti effect component
const ConfettiEffect = () => {
  const [pieces, setPieces] = useState<
    Array<{
      x: number;
      y: number;
      delay: number;
      color: string;
      size: number;
    }>
  >([]);

  const colors = [
    "bg-aquaTextPrimary",
    "bg-aqua",
    "bg-aquaTextSecondary",
    "bg-blue",
    "bg-lightBlue",
    "bg-lighterBlue",
    "bg-pink",
    "bg-green",
    "bg-lightGreen",
    "bg-red",
    "bg-yellowText",
    "bg-darkBlue",
    "bg-slateBlue",
  ];

  useEffect(() => {
    const allPieces = [];

    // Main center burst - 120 pieces
    const centerBurst = Array.from({ length: 120 }, (_, i) => ({
      x: (Math.random() - 0.5) * 1000,
      y: Math.random() * -700 - 100,
      delay: i * 0.015,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 12 + 4,
    }));

    // Second wave from center - 100 pieces
    const secondWave = Array.from({ length: 100 }, (_, i) => ({
      x: (Math.random() - 0.5) * 1200,
      y: Math.random() * -800 - 200,
      delay: 1.2 + i * 0.012,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 3,
    }));

    // Left side burst - 80 pieces
    const leftBurst = Array.from({ length: 80 }, (_, i) => ({
      x: Math.random() * 600 + 200,
      y: Math.random() * -500 - 100,
      delay: 0.6 + i * 0.02,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 3,
    }));

    // Right side burst - 80 pieces
    const rightBurst = Array.from({ length: 80 }, (_, i) => ({
      x: Math.random() * -600 - 200,
      y: Math.random() * -500 - 100,
      delay: 0.6 + i * 0.02,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 3,
    }));

    // Top shower - 90 pieces
    const topShower = Array.from({ length: 90 }, (_, i) => ({
      x: (Math.random() - 0.5) * 1400,
      y: Math.random() * -300 - 400,
      delay: 2.2 + i * 0.015,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 2,
    }));

    // Continuous sprinkle - 70 pieces
    const sprinkle = Array.from({ length: 70 }, (_, i) => ({
      x: (Math.random() - 0.5) * 800,
      y: Math.random() * -400 - 300,
      delay: 3.2 + i * 0.025,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 3,
    }));

    // Final celebration burst - 60 pieces
    const finalBurst = Array.from({ length: 60 }, (_, i) => ({
      x: (Math.random() - 0.5) * 1000,
      y: Math.random() * -600 - 150,
      delay: 4.5 + i * 0.01,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 4,
    }));

    allPieces.push(
      ...centerBurst,
      ...secondWave,
      ...leftBurst,
      ...rightBurst,
      ...topShower,
      ...sprinkle,
      ...finalBurst,
    );
    setPieces(allPieces);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {pieces.map((piece, i) => (
        <ConfettiPiece key={i} {...piece} />
      ))}
    </div>
  );
};

export default ConfettiEffect;
