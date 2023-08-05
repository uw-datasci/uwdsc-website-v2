import Hero from '@/components/sections/home/Hero';
import WhatWeDo from '@/components/sections/home/WhatWeDo';
import ClubStats from '@/components/sections/home/ClubStats';
import UpcomingEvents from '@/components/sections/home/UpcomingEvents';
import PastEvents from '@/components/sections/home/PastEvents';
import MailingList from '@/components/sections/home/MailingList';
import FAQ from '@/components/sections/home/FAQ';
import Blogs from '@/components/sections/home/Blogs';
import Sponsors from '@/components/sections/home/Sponsors';
import Contact from '@/components/sections/home/Contact';
import Footer from '@/components/navigation/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <ClubStats />
      <UpcomingEvents />
      <PastEvents />
      <MailingList />
      <FAQ />
      <Blogs />
      <Sponsors />
      <Contact />
      <Footer />
    </>
  );
}
