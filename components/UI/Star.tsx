const Star = ({ size = 5, top = 0, left = 0 }) => (
    <div
      className="absolute z-[-1] inline-block bg-white"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    ></div>
);

export default Star;