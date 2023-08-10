type SectionTitleProps = {
  mb: string;
  children: string;
};

export default function SectionTitle({ mb, children }: SectionTitleProps) {
  return (
    <h2
      className={`text-center font-display font-medium tracking-[10px] md:text-lg xl:text-xl ${mb}`}
    >
      <span className="gradient-text -mr-2 bg-gradient-to-b from-white to-[#ffffff20]">
        {children.toUpperCase()}
      </span>
    </h2>
  );
}
