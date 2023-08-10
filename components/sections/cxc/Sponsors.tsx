import Image from "next/image";

import SectionTitle from "@/components/UI/SectionTitle";

import { PAST_SPONSORS } from "@/constants/sponsors";

export default function Sponsors() {
  return (
    <section className="mb-section mx-container">
      <SectionTitle mb="mb-12">PAST SPONSORS</SectionTitle>
      <div className="flex flex-wrap justify-center gap-x-40 gap-y-20">
        {PAST_SPONSORS.map(({ name, logo }) => (
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
