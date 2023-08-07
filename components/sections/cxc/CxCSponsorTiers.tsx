import SectionTitle from "@/components/UI/SectionTitle";
import SponsorTier, { sponsorTierType } from "@/components/UI/SponsorTier";

const SPONSOR_TIERS: sponsorTierType[] = [
  {
    tierName: "Silver",
    tierColor: "bg-gradient-to-b gradient-text from-[#ffffff20] to-white",
    description:
      "Communicate and have more exposure to our diverse pool of attendees",
    perks: [
      "Sponsor Booth",
      "Distribute Swag",
      "Host workshops/demos",
      "Logo on posters",
    ],
    value: 500,
  },
  {
    tierName: "Gold",
    tierColor: "bg-gradient-to-b gradient-text from-[#FFD700] to-white",
    description:
      "Companies that donate datasets are automatically gold sponsors",
    perks: [
      "Dedicated social media post",
      "Dedicated speaking time",
      "Send emails to attendees",
      "Silver benefits",
    ],
    value: 1000,
  },
  {
    tierName: "Platinum",
    tierColor: "bg-gradient-to-b gradient-text from-[#A9A9A9] to-white",
    description: "The higest level, the highest recognition and promotion!",
    perks: ["Title Sponsor", "Gold Benefits", "Logo on posters"],
    value: 3000,
  },
];

export default function CxCSponsorTiers() {
  return (
    <section className="mb-section mx-container">
      <SectionTitle mb="mb-6">SPONSORSHIP TIERS</SectionTitle>
      <div className="flex flex-col lg:flex-row md:flex-col justify-center">
        {SPONSOR_TIERS.map((props: sponsorTierType) => (
          <SponsorTier {...props} />
        ))}
      </div>
    </section>
  );
}
