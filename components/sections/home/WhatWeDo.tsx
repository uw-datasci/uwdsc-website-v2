import SectionTitle from "@/components/UI/SectionTitle";
import WhatWeDoCard from "@/components/cards/WhatWeDoCard";

import { WHAT_WE_DO_CARDS } from "@/constants/other";

export default function WhatWeDo() {
  return (
    <section className="mb-section mx-container">
      <SectionTitle mb="mb-7 md:mb-10">WHAT WE DO</SectionTitle>
      <div className="mx-auto grid max-w-[360px] gap-6 md:max-w-[720px] md:grid-cols-2 2xl:max-w-none 2xl:grid-cols-3">
        {WHAT_WE_DO_CARDS.map((card, i) => (
          <WhatWeDoCard {...card} key={`card-${i}`} />
        ))}
      </div>
    </section>
  );
}
