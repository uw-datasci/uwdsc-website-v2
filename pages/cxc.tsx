import CxCHero from '@/components/sections/cxc/CxCHero';
import CxCStats from '@/components/sections/cxc/CxCStats';
import FrequentlyAskedQuestions from '@/components/sections/cxc/FrequentlyAskedQuestions';
import SponsorshipTiers from '@/components/sections/cxc/SponsorshipTiers';
import SponsorshipInterest from '@/components/sections/cxc/SponsorshipInterest';
import SponsorForm from '@/components/sections/cxc/SponsorForm';
import Sponsors from '@/components/sections/cxc/Sponsors';

export default function CxC() {
  return (
    <>
      <CxCHero />
      <CxCStats />
      <FrequentlyAskedQuestions />
      <SponsorshipTiers />
      <SponsorshipInterest />
      <SponsorForm />
      <Sponsors />
    </>
  );
}
