import CxCStats from "@/components/sections/cxc/CxCStats";
import CxCInterest from "@/components/sections/cxc/CxCInterest";
import CxCSponsorTiers from "@/components/sections/cxc/CxCSponsorTiers";
import CxCContact from "@/components/sections/cxc/CxCContact";

export default function CxC() {
  return (
    <>
      <CxCStats />
      <CxCSponsorTiers />
      <CxCInterest />
      <CxCContact />
    </>
  );
}
