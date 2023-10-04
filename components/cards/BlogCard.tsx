import Image from 'next/image';
import GradientBorder from '../UI/GradientBorder';

import { type Blog } from '@/types/types';

type BlogCardProps = Blog;

export default function BlogCard({
  title,
  description,
  image,
  link,
  label,
}: BlogCardProps) {
  return (
    <div className="m-0 overflow-hidden rounded-2xl lg:w-[564px] md:w-[400px] sm:w-[400px]">
      <div className="relative">
        <a href={link} target="_blank">
          <Image src={image} alt={title} className="relative object-cover rounded-2xl lg:w-[564px] lg:h-[319px] md:w-[400px] md:h-[226px] sm:w-[400px] sm:h-[226px]" />
        </a>
        <h1 className="absolute bottom-3 right-2 p-4 text-sm font-normal text-white">
          <GradientBorder rounded="rounded-full">
            <p className="text-white bg-black rounded-full py-1 px-3">{label}</p>
          </GradientBorder>
        </h1>
      </div>
      <div className="relative whitespace-normal">
        <div className="relative pb-8 pt-5">
          <h4
            className={`text-2xl font-bold text-white md:text-3xl ${description ? 'mb-2' : ''
              }`}
          >
            {title}
          </h4>
          {description && (
            <p className="mb-5 text-sm leading-loose text-grey1 md:text-md">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
