import Button from '@/components/UI/Button';
import GradientBorder from '@/components/UI/GradientBorder';

import { type Resource } from '@/types/types';

type ResourceCardProps = Resource;

export default function ResourceCard({
  title,
  description,
  link,
}: ResourceCardProps) {
  return (
    <div className='border border-grey3 whitespace-normal relative rounded-4xl w-[300px] md:w-[360px] overflow-hidden'>
      <div className='bg-gradient opacity-10 absolute inset-0' />
      <div className='relative px-6 pt-5 pb-8'>
        <h4 className='text-white font-bold text-2xl md:text-3xl mb-2'>
          {title}
        </h4>
        <p className='text-grey1 leading-loose text-sm md:text-md mb-7'>
          {description}
        </p>
        <GradientBorder rounded='rounded-md'>
          <Button
            type='link'
            href={link}
            hierarchy='secondary'
            font='font-bold'
            rounded='rounded-md'
            classes='w-full'
          >
            Learn More
          </Button>
        </GradientBorder>
      </div>
    </div>
  );
}
