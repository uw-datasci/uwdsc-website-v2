import SectionTitle from '@/components/UI/SectionTitle';
import SponsorTierCard from '@/components/cards/SponsorTierCard';

import { type SponsorTier } from '@/types/types';

const SPONSOR_TIERS: SponsorTier[] = [
  {
    id: 'silver',
    name: 'Silver',
    color: 'bg-gradient-to-b gradient-text from-[#ffffff20] to-white',
    description:
      'Communicate and have more exposure to our diverse pool of attendees!',
    perks: [
      'Sponsor Booth',
      'Distribute Swag',
      'Host workshops/demos',
      'Logo on posters',
    ],
    value: 500,
  },
  {
    id: 'gold',
    name: 'Gold',
    color: 'bg-gradient-to-b gradient-text from-[#FFD700] to-white',
    description:
      'Companies that donate datasets are automatically gold sponsors!',
    perks: [
      'Dedicated social media post',
      'Dedicated speaking time',
      'Send emails to attendees',
      'Silver benefits',
    ],
    value: 1000,
  },
  {
    id: 'platinum',
    name: 'Platinum',
    color: 'bg-gradient-to-b gradient-text from-[#A9A9A9] to-white',
    description: 'The higest level, the highest recognition and promotion!',
    perks: ['Title Sponsor', 'Gold Benefits', 'Logo on posters'],
    value: 3000,
  },
];

export default function SponsorshipTiers() {
  return (
    <section className='mb-section mx-container'>
      <SectionTitle mb='mb-8 md:mb-12'>SPONSORSHIP TIERS</SectionTitle>
      <div className='flex justify-center flex-wrap gap-14'>
        {SPONSOR_TIERS.map((props: SponsorTier) => (
          <SponsorTierCard {...props} key={props.id} />
        ))}
      </div>
    </section>
  );
}
