import Image from 'next/image';
import { Clock, Link, MapPin } from 'react-feather';

import { type Event } from '@/types/types';

type EventCardProps = Event;

export default function EventCard({
  title,
  description,
  image,
  date,
  location,
  link,
}: EventCardProps) {
  return (
    <div className='border border-grey3 rounded-4xl w-[300px] md:w-[360px] overflow-hidden'>
      <Image src={image} alt={title} className='aspect-[2/1] object-cover' />
      <div className='relative whitespace-normal'>
        <div className='bg-gradient opacity-10 absolute inset-0' />
        <div className='relative px-6 pt-5 pb-8'>
          <h4
            className={`text-white font-bold text-2xl md:text-3xl ${
              description ? 'mb-2' : ''
            }`}
          >
            {title}
          </h4>
          {description && (
            <p className='text-grey1 leading-loose text-sm md:text-md mb-5'>
              {description}
            </p>
          )}
          {date && (
            <div className='flex gap-3 items-center mb-5'>
              <Clock className='w-6 text-white' />
              <p className='text-white'>{date}</p>
            </div>
          )}
          {(location || link) && (
            <div className='flex gap-3 items-center'>
              {location && (
                <>
                  <MapPin className='w-6 text-white' />
                  <p className='text-white'>{location}</p>
                </>
              )}
              {link && (
                <>
                  <Link className='w-6 text-white' />
                  <a
                    href={link}
                    target='_blank'
                    rel='noreferrer noopener'
                    className='text-white underline underline-offset-[6px]'
                  >
                    Event Link
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
