import SEO from "@/components/SEO/SEO";
import Hero from "@/components/sections/home/Hero";
import WhatWeDo from "@/components/sections/home/WhatWeDo";
import ClubStats from "@/components/sections/home/ClubStats";
import MailingList from "@/components/sections/home/MailingList";
import FrequentlyAskedQuestions from "@/components/sections/home/FrequentlyAskedQuestions";
import Sponsors from "@/components/sections/templates/Sponsors";
import { CURRENT_SPONSORS } from "@/constants/sponsors";
import ContactUs from "@/components/sections/home/ContactUs";
import PastEvents from "@/components/sections/home/PastEvents";

export default function Home() {
  return (
    <div>
      <SEO
        title="UWaterloo Data Science Club"
        description="Inspiring the data science leaders of the future by building an inclusive community at the University of Waterloo to bridge the gap between academics and the industry."
        keywords="University of Waterloo,Data Science,University of Waterloo Data Science Club,Waterloo Data Science,UWDSC"
      />
      <Hero />
      <WhatWeDo />
      <ClubStats />
      {/* <UpcomingEvents /> */}
      <PastEvents />
      <Sponsors
        sectionTitle="OUR SPONSORS"
        className=""
        sponsorList={CURRENT_SPONSORS}
      />
      {/* <Resources /> */}
      <MailingList />
      <FrequentlyAskedQuestions />
      {/* <Blogs /> */}
      <ContactUs />
    </div>
  );
}
