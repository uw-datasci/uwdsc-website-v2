import SectionTitle from "@/components/UI/SectionTitle";
import SponsorTierCard from "@/components/cards/SponsorTierCard";

import { SPONSOR_TIERS } from "@/constants/sponsors";

export default function SponsorshipTiers() {
  return (
    <section className="mb-section mx-container">
      <SectionTitle mb="mb-8 md:mb-12">SPONSORSHIP TIERS</SectionTitle>
      <div className="flex flex-wrap justify-center gap-14">
        {SPONSOR_TIERS.map((sponsorTier) => (
          <SponsorTierCard {...sponsorTier} key={sponsorTier.id} />
        ))}
      </div>
    </section>
  );
}
