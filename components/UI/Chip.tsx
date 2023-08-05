import GradientBorder from './GradientBorder';

type ChipProps = {
  icon: React.ReactNode;
  href: string;
  children: React.ReactNode;
};

export default function Chip({ icon, href, children }: ChipProps) {
  return (
    <GradientBorder rounded='rounded-full'>
      <a
        href={href}
        target='_blank'
        rel='noreferrer'
        className='bg-black rounded-full pl-4 pr-5 py-3 flex items-center gap-2'
      >
        {icon}
        <p className='text-white font-semibold'>{children}</p>
      </a>
    </GradientBorder>
  );
}
