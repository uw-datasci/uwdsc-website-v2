import { Check } from 'react-feather';

import GradientBorder from '@/components/UI/GradientBorder';

import { type SponsorTier } from '@/types/types';

type SponsorTierProps = SponsorTier;

export default function SponsorTierCard({
  name,
  color,
  description,
  perks,
  value,
}: SponsorTierProps) {
  return (
    <GradientBorder rounded='rounded-2xl' classes='w-[min(100%,340px)]'>
      <div className='rounded-2xl bg-black text-center px-6 pt-8 h-full pb-10 flex flex-col justify-between'>
        <div>
          <h2 className='text-3xl 3xs:text-5xl font-bold mb-2'>
            <span className={color}>{name}</span>
          </h2>
          <div className='text-white leading-loose mb-8'>{description}</div>
          <ul className='mb-12 grid gap-3.5'>
            {perks.map((perk) => (
              <li className='flex items-center gap-3.5' key={perk}>
                <div className='w-4 h-4 rounded-full grid place-content-center bg-green'>
                  <Check className='text-black w-2.5' />
                </div>
                <p className='text-white font-medium'>{perk}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className='text-white font-bold text-7xl mb-2 font-display'>{`$${value}+`}</div>
      </div>
    </GradientBorder>
  );
}
