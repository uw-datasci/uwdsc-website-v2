import CxCStats from "@/components/sections/cxc/CxCStats";
import CxCInterest from "@/components/sections/cxc/CxCInterest";
import CxCSponsorTiers from "@/components/sections/cxc/CxCSponsorTiers";
import CxCContact from "@/components/sections/cxc/CxCContact";
import CxCSponsors from "@/components/sections/cxc/CxCSponsors";

export default function CxC() {
  return (
    <>
      <CxCStats />
      <CxCSponsorTiers />
      <CxCInterest />
      <CxCContact />
      <CxCSponsors />
    </>
  );
}
