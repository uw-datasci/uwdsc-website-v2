import Image from "next/image";

import SectionTitle from "@/components/UI/SectionTitle";

import { CURRENT_CXC_SPONSORS } from "@/constants/sponsors";

export default function CxCSponsors() {
  return (
    <section className="mb-section mx-container">
      <SectionTitle mb="mb-20">THIS YEAR&apos;S SPONSORS</SectionTitle>
      <div className="flex flex-wrap justify-center gap-x-24 gap-y-20">
        {CURRENT_CXC_SPONSORS.map(({ name, logo, type }) => {
          let height = "h-1 md:h-2"
          if (type=="top"){
            height = "h-24 md:h-22"
          } else if (type=="dataset"){
            height = "h-15 md:h-16"
          } else if (type=="gold"){
            height = "h-12 md:h-11"
            if (name == "Interac" || name == "LiveAssets"){
              height = "h-14 md:h-16"
            }
          } else if (type=="silver"){
            height = "h-8 md:h-8"
          }
          return(
            <Image
            src={logo}
            alt={name}
            className={`w-auto ${height}`} 
            key={name}
            />
          )
        })}
      </div>
    </section>
  );
}
