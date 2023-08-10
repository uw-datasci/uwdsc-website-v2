import Image from 'next/image';

import SectionTitle from '@/components/UI/SectionTitle';

import { PAST_SPONSORS } from '@/constants/sponsors';

export default function Sponsors() {
  return (
    <section className='mb-section mx-container'>
      <SectionTitle mb='mb-12'>PAST SPONSORS</SectionTitle>
      <div className='flex gap-y-20 gap-x-40 justify-center flex-wrap'>
        {PAST_SPONSORS.map(({ name, logo }) => (
          <Image
            src={logo}
            alt={name}
            className='h-16 md:h-20 w-auto'
            key={name}
          />
        ))}
      </div>
    </section>
  );
}
