import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';

import GradientBorder from '@/components/UI/GradientBorder';

type CarouselProps = {
  title: string;
  children: React.ReactNode[];
};

export default function Carousel({ title, children }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      if (direction === 'left') {
        carousel.scrollLeft -= 300;
      } else {
        carousel.scrollLeft += 300;
      }
    }
  };

  return (
    <section className='mb-section'>
      <div className='mx-container mb-6 flex items-center justify-between xl:mb-8'>
        <h2 className='text-2xl sm:text-3xl font-bold text-white lg:text-4xl 2xl:text-5xl'>
          {title}
        </h2>
        <div className='hidden gap-4 md:flex'>
          <GradientBorder rounded='rounded-sm'>
            <div
              onClick={() => handleScroll('left')}
              className='cursor-pointer rounded-sm p-2 bg-black grid place-content-center group'
            >
              <ArrowLeft className='w-6 text-white opacity-70 group-hover:opacity-100 transition-300' />
            </div>
          </GradientBorder>
          <GradientBorder rounded='rounded-sm'>
            <div
              onClick={() => handleScroll('right')}
              className='cursor-pointer rounded-sm p-2 bg-black grid place-content-center group'
            >
              <ArrowRight className='w-6 text-white opacity-70 group-hover:opacity-100 transition-300' />
            </div>
          </GradientBorder>
        </div>
      </div>
      <div className='relative'>
        <div
          ref={carouselRef}
          className='px-container no-scrollbar relative flex gap-9 overflow-x-scroll scroll-smooth whitespace-nowrap pr-[10%]'
        >
          {children.map((child, i) => (
            <div className='inline-flex self-stretch' key={`child-${i}`}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
