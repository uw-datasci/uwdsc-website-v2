type BannerProps = {
  children: React.ReactNode;
};

/**
 * Not currently used
 */

export default function Banner({ children }: BannerProps) {
  return (
    <div className="relative">
      <div className="bg-gradient absolute inset-0 opacity-20" />
      <div className="mx-container relative z-10">{children}</div>
    </div>
  );
}
