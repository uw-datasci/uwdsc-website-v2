import SEO from "@/components/SEO/SEO";
import Hero from "@/components/sections/cxc/Hero";
import Image from "next/image";
import CxCStats from "@/components/sections/cxc/CxCStats";
import FrequentlyAskedQuestions from "@/components/sections/cxc/FrequentlyAskedQuestions";
import PastCxC from "@/components/sections/cxc/PastCxC";
import Sponsors from "@/components/sections/templates/Sponsors";
import Partners from "@/components/sections/templates/Partners";
import { CURRENT_CXC_SPONSORS } from "@/constants/sponsors";
import { CURRENT_CXC_PARTNERS } from "@/constants/sponsors";
import cxctitle from "@/public/cxc/graphics/CxCTitle.png";

import CxCBackground from "@/components/UI/CxCBackground";
import { useEffect, useState } from "react";
import { getCurrentUserRegistrationByID } from "@/utils/apiCalls";

export default function CxC() {
  const [registered, setRegistered] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const response = await getCurrentUserRegistrationByID();
        setRegistered(response.data.exist); // true or false
        setStatus(response.data.status);
        console.log(response.data);
      } catch (e) {
        setRegistered(false);
      }
    };
    checkRegistration();
  }, []);

  return (
    <>
      <SEO
        title="CxC | UWaterloo Data Science Club"
        description="Experience CxC, a hackathon that brings together students and companies to build projects that solve real-world problems."
      />
      <div
        className="relative z-10 mx-auto my-0 min-h-screen py-10"
        style={{
          background: "linear-gradient(to bottom, #000000, #03137c)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute left-1/2 ml-10 w-[75%] -translate-x-1/2 lg:w-[55%]">
          <Image src={cxctitle} alt="CxC Title" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
        </div>
        <CxCBackground />
        {/* Hero Section */}
        <Hero registered={registered} status={status} />

        {/* CxC Stats Section */}
        <div>
          <CxCStats />
        </div>

        {/* Sponsors Section */}
        <Sponsors
          sectionTitle=""
          className="gap-x-24 gap-y-20"
          sponsorList={CURRENT_CXC_SPONSORS}
        />

        {/* Partners Section */}
        <Partners
          sectionTitle=""
          className="gap-x-24 gap-y-20"
          partnerList={CURRENT_CXC_PARTNERS}
        />

        {/* Past CxC Section */}
        <FrequentlyAskedQuestions />
        <div className="py-[10%] lg:py-[5%]">
          <PastCxC />
        </div>

        {/* <SponsorshipTiers /> */}
        {/* <SponsorshipInterest /> */}
        {/* <SponsorForm /> */}
        {/* <Sponsors sectionTitle="THIS YEAR&apos;S SPONSORS" className="" sponsorList={PAST_SPONSORS}/> */}
      </div>
    </>
  );
}
