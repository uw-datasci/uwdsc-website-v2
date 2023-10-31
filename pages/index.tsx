import SEO from "@/components/SEO/SEO";
import Hero from "@/components/sections/home/Hero";
import WhatWeDo from "@/components/sections/home/WhatWeDo";
import ClubStats from "@/components/sections/home/ClubStats";
import UpcomingEvents from "@/components/sections/home/UpcomingEvents";
import PastEvents from "@/components/sections/home/PastEvents";
import Resources from "@/components/sections/home/Resources";
import MailingList from "@/components/sections/home/MailingList";
import FrequentlyAskedQuestions from "@/components/sections/home/FrequentlyAskedQuestions";
import Blogs from "@/components/sections/home/Blogs";
import Sponsors from "@/components/sections/home/Sponsors";
import ContactUs from "@/components/sections/home/ContactUs";

export default function Home() {
  return (
    <>
      <SEO
        title="UWaterloo Data Science Club"
        description="Inspiring the data science leaders of the future by building an inclusive community at the University of Waterloo to bridge the gap between academics and the industry."
        keywords="University of Waterloo,Data Science,University of Waterloo Data Science Club,Waterloo Data Science,UWDSC"
      />
      <Hero />
      <WhatWeDo />
      <ClubStats />
      <UpcomingEvents />
      {/* <PastEvents /> */}
      {/* <Resources /> */}
      <MailingList />
      <FrequentlyAskedQuestions />
      {/* <Blogs /> */}
      <Sponsors />
      <ContactUs />
    </>
  );
}
