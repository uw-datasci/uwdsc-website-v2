import Image from 'next/image';

import SectionTitle from '@/components/UI/SectionTitle';

import mathsoc from '@/public/logos/mathsoc.png';
import mef from '@/public/logos/mef.png';

export default function Sponsors() {
  return (
    <section className='mb-section mx-container'>
      <SectionTitle mb='mb-12'>OUR SPONSORS</SectionTitle>
      <div className='flex gap-16 lg:gap-40 justify-center flex-wrap'>
        <Image
          src={mathsoc}
          alt='mathsoc logo'
          className='h-16 md:h-20 w-auto'
        />
        <Image src={mef} alt='mef logo' className='w-auto h-16 md:h-20' />
      </div>
    </section>
  );
}
