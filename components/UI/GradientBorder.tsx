type GradientBorderProps = {
  rounded?: string;
  classes?: string;
  children: React.ReactNode;
};

export default function GradientBorder({
  rounded,
  classes,
  children,
}: GradientBorderProps) {
  return (
    <div className={`p-0.25 bg-gradient ${rounded} ${classes}`}>{children}</div>
  );
}
