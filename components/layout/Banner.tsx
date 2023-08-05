type BannerProps = {
  children: React.ReactNode;
};

export default function Banner({ children }: BannerProps) {
  return (
    <div className='relative'>
      <div className='bg-gradient opacity-20 absolute inset-0' />
      <div className='relative z-10 mx-container'>{children}</div>
    </div>
  );
}
