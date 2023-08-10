import SectionTitle from '@/components/UI/SectionTitle';
import WhatWeDoCard from '@/components/cards/WhatWeDoCard';

import { WHAT_WE_DO_CARDS } from '@/constants/other';

export default function WhatWeDo() {
  return (
    <section className='mb-section mx-container'>
      <SectionTitle mb='mb-7 md:mb-10'>WHAT WE DO</SectionTitle>
      <div className='grid gap-6 md:grid-cols-2 2xl:grid-cols-3 max-w-[360px] mx-auto md:max-w-[720px] 2xl:max-w-none'>
        {WHAT_WE_DO_CARDS.map((card, i) => (
          <WhatWeDoCard {...card} key={`card-${i}`} />
        ))}
      </div>
    </section>
  );
}
