import Image from "next/image";

import SectionTitle from "@/components/UI/SectionTitle";

import mathsoc from "@/public/logos/mathsoc.png";
import mef from "@/public/logos/mef.png";

export default function Sponsors() {
  return (
    <section className="mb-section mx-container">
      <SectionTitle mb="mb-12">OUR SPONSORS</SectionTitle>
      <div className="flex flex-wrap justify-center gap-16 lg:gap-40">
        <Image
          src={mathsoc}
          alt="mathsoc logo"
          className="h-16 w-auto md:h-20"
        />
        <Image src={mef} alt="mef logo" className="h-16 w-auto md:h-20" />
      </div>
    </section>
  );
}
