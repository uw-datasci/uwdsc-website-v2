import { Check } from "react-feather";

import GradientBorder from "@/components/UI/GradientBorder";

import { type SponsorTier } from "@/types/types";

type SponsorTierProps = SponsorTier;

export default function SponsorTierCard({
  name,
  color,
  description,
  perks,
  value,
}: SponsorTierProps) {
  return (
    <GradientBorder rounded="rounded-2xl" classes="w-[min(100%,340px)]">
      <div className="flex h-full flex-col justify-between rounded-2xl bg-black px-6 pb-10 pt-8 text-center">
        <div>
          <h2 className="mb-2 text-3xl font-bold 3xs:text-5xl">
            <span className={color}>{name}</span>
          </h2>
          <div className="mb-8 leading-loose text-white">{description}</div>
          <ul className="mb-12 grid gap-3.5">
            {perks.map((perk) => (
              <li className="flex items-center gap-3.5" key={perk}>
                <div className="grid h-4 w-4 place-content-center rounded-full bg-green">
                  <Check className="w-2.5 text-black" />
                </div>
                <p className="font-medium text-white">{perk}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-2 font-display text-7xl font-bold text-white">{`$${value}+`}</div>
      </div>
    </GradientBorder>
  );
}
