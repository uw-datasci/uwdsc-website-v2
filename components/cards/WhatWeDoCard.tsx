import Image, { type StaticImageData } from 'next/image';

type WhatWeDoCardProps = {
  title: string;
  description: string;
  graphic: StaticImageData;
};

export default function WhatWeDoCard({
  title,
  description,
  graphic,
}: WhatWeDoCardProps) {
  return (
    <div className='group relative transition-300 overflow-hidden px-6 pb-8 flex flex-col justify-end aspect-[3/2] rounded-3xl border border-grey3 hover:border-grey2'>
      <div>
        <h4 className='text-white font-bold text-2xl mb-2'>{title}</h4>
        <p className='text-grey2 leading-loose xl:text-lg group-hover:text-grey1 transition-300'>
          {description}
        </p>
      </div>
      <Image
        src={graphic}
        alt={title}
        className='transition-300 w-[60%] absolute -top-[10%] -right-[10%] opacity-20 -z-10 group-hover:opacity-40'
      />
    </div>
  );
}
