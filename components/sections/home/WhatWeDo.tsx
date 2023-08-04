import SectionTitle from '@/components/UI/SectionTitle';
import WhatWeDoCard from '@/components/cards/WhatWeDoCard';

import rocket from '@/public/graphics/rocket.png';
import trophy from '@/public/graphics/trophy.png';
import folder from '@/public/graphics/folder.png';
import computer from '@/public/graphics/computer.png';
import documents from '@/public/graphics/documents.png';
import chat from '@/public/graphics/chat.png';

const CARDS = [
  {
    title: 'Workshops',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    graphic: rocket,
  },
  {
    title: 'CXC',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    graphic: trophy,
  },
  {
    title: 'Project Program',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    graphic: folder,
  },
  {
    title: 'E-Leetcoding',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    graphic: computer,
  },
  {
    title: 'Reading Groups',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    graphic: documents,
  },
  {
    title: 'Social Events',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    graphic: chat,
  },
];

export default function WhatWeDo() {
  return (
    <section className='mb-section mx-container'>
      <SectionTitle mb='mb-7 md:mb-10'>WHAT WE DO</SectionTitle>
      <div className='grid gap-6 md:grid-cols-2 2xl:grid-cols-3 max-w-[360px] mx-auto md:max-w-[720px] 2xl:max-w-none'>
        {CARDS.map((card, i) => (
          <WhatWeDoCard {...card} key={`card-${i}`} />
        ))}
      </div>
    </section>
  );
}
