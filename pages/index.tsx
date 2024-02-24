import SEO from "@/components/SEO/SEO";
import Hero from "@/components/sections/home/Hero";
import WhatWeDo from "@/components/sections/home/WhatWeDo";
import ClubStats from "@/components/sections/home/ClubStats";
import UpcomingEvents from "@/components/sections/home/UpcomingEvents";
import Resources from "@/components/sections/home/Resources";
import MailingList from "@/components/sections/home/MailingList";
import FrequentlyAskedQuestions from "@/components/sections/home/FrequentlyAskedQuestions";
import Blogs from "@/components/sections/home/Blogs";
import Sponsors from "@/components/sections/templates/Sponsors";
import {CURRENT_SPONSORS} from "@/constants/sponsors"
import ContactUs from "@/components/sections/home/ContactUs";
import PastEvents from "@/components/sections/home/PastEvents"

export default function Home() {
  return (
    <>
      <SEO
        title="UWaterloo Data Science Club"
        description="Inspiring the data science leaders of the future by building an inclusive community at the University of Waterloo to bridge the gap between academics and the industry."
        keywords="University of Waterloo,Data Science,University of Waterloo Data Science Club,Waterloo Data Science,UWDSC"
      />
      <Hero />
      <Sponsors sectionTitle="OUR SPONSORS" className="" sponsorList={CURRENT_SPONSORS}/>
      <WhatWeDo />
      <ClubStats />
      {/* <UpcomingEvents /> */}
      <PastEvents />
      {/* <Resources /> */}
      <MailingList />
      <FrequentlyAskedQuestions />
      {/* <Blogs /> */}
      <ContactUs />
    </>
  );
}
