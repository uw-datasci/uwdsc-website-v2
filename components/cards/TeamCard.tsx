import Image from 'next/image';

import { Mail, Globe, Instagram, Linkedin } from 'react-feather';

import { type Member } from '@/types/types';

type TeamCardProps = Member;

export default function TeamCard({
  name,
  position,
  image,
  email,
  website,
  instagram,
  linkedin,
}: TeamCardProps) {
  return (
    <div className='rounded-2xl border border-grey3 pt-7 pb-8 w-full 3xs:w-[240px] xl:w-[280px] px-6 text-center hover:border-grey2 xl:rounded-4xl transition-300'>
      <Image
        src={image}
        alt={name}
        className='aspect-square object-cover w-32 xl:w-40 inline-block rounded-lg mb-6'
      />
      <h4 className='text-white font-semibold text-xl xl:text-2xl mb-2.5'>
        {name}
      </h4>
      <p className='text-grey2 font-medium xl:text-lg mb-4'>{position}</p>
      <div className='flex gap-5 justify-center'>
        {email && (
          <a href={`mailto:${email}`} target='_blank' rel='noreferrer noopener'>
            <Mail className='text-grey2 hover:text-grey1 transition-300' />
          </a>
        )}
        {website && (
          <a href={website} target='_blank' rel='noreferrer noopener'>
            <Globe className='text-grey2 hover:text-grey1 transition-300' />
          </a>
        )}
        {instagram && (
          <a href={instagram} target='_blank' rel='noreferrer noopener'>
            <Instagram className='text-grey2 hover:text-grey1 transition-300' />
          </a>
        )}
        {linkedin && (
          <a href={linkedin} target='_blank' rel='noreferrer noopener'>
            <Linkedin className='text-grey2 hover:text-grey1 transition-300' />
          </a>
        )}
      </div>
    </div>
  );
}
