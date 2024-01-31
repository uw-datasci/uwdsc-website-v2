import Image from "next/image";

import SectionTitle from "@/components/UI/SectionTitle";

import { CURRENT_CXC_SPONSORS } from "@/constants/sponsors";

export default function CxCSponsors() {
  return (
    <section className="mb-section mx-container">
      <SectionTitle mb="mb-20">THIS YEAR&apos;S SPONSORS</SectionTitle>
      <div className="flex flex-wrap justify-center gap-x-40 gap-y-20">
        {CURRENT_CXC_SPONSORS.map(({ name, logo }) => (
          <Image
            src={logo}
            alt={name}
            className="h-16 w-auto md:h-20"
            key={name}
          />
        ))}
      </div>
    </section>
  );
}
