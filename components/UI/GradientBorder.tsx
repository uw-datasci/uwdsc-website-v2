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
    <div className={`bg-gradient p-0.25 ${rounded} ${classes}`}>{children}</div>
  );
}
