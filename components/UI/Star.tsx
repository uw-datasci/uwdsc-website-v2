type starProps = {
  size: number;
  top: number;
  left: number;
  degrees: number;
};

export default function Star({ size, top, left, degrees }: starProps) {
  return (
    <div
      className="shadow-[0_0_10px_5px_rgba(255, 255, 255, 0.8)] absolute z-[-1] inline-block animate-star-sparkle bg-white"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}%`,
        left: `${left}%`,
        transform: `rotate(${degrees}deg)`,
      }}
    ></div>
  );
}
