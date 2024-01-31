import SEO from "@/components/SEO/SEO";
import Hero from "@/components/sections/cxc/Hero";
import CxCStats from "@/components/sections/cxc/CxCStats";
import FrequentlyAskedQuestions from "@/components/sections/cxc/FrequentlyAskedQuestions";
import SponsorshipTiers from "@/components/sections/cxc/SponsorshipTiers";
import SponsorshipInterest from "@/components/sections/cxc/SponsorshipInterest";
import SponsorForm from "@/components/sections/cxc/SponsorForm";
import Sponsors from "@/components/sections/home/Sponsors";
import PastEvents from "@/components/sections/cxc/PastEvents"
import PastSponsors from "@/components/sections/cxc/PastSponsors";
import PastCxC from "@/components/sections/cxc/PastCxC";
import CxCSponsors from "@/components/sections/cxc/CxCSponsors";

export default function CxC() {
  return (
    <>
      <SEO
        title="CxC | UWaterloo Data Science Club"
        description="Experience CxC, a hackathon that brings together students and companies to build projects that solve real-world problems."
      />
      <Hero />
      <CxCSponsors/>
      <PastEvents />
      <PastCxC/>
      <CxCStats />
      <SponsorshipTiers />
      <SponsorshipInterest />
      <SponsorForm />
      <PastSponsors />
    </>
  );
}
