type SectionTitleProps = {
  mb: string;
  children: React.ReactNode;
};

export default function SectionTitle({ mb, children }: SectionTitleProps) {
  return (
    <h2
      className={`font-display font-medium tracking-[10px] text-center md:text-lg xl:text-xl ${mb}`}
    >
      <span className='bg-gradient-to-b gradient-text from-white to-[#ffffff20] -mr-2'>
        {children}
      </span>
    </h2>
  );
}
