import Image from "next/image";
import { type Sponsor } from "@/types/types";
import SectionTitle from "@/components/UI/SectionTitle";

type SponsorsProps = {
  sectionTitle: string;
  className: string;
  sponsorList: Sponsor[]
};

/**
 * Used to render sponsors section
 * ex. "OUR SPONSORS" on home page, "THIS YEAR'S SPONSORS" on cxc page
 */

export default function Sponsors({
  sectionTitle,
  className,
  sponsorList
}: SponsorsProps
) {
  if (className == ""){
    className = "gap-x-40 gap-y-20"
  }
  return (
    <section className="mb-section mx-container">
      <SectionTitle mb="mb-20">{sectionTitle}</SectionTitle>
      <div className={`flex flex-wrap justify-center ${className}`}>
        {sponsorList?.map(({ name, logo, type }) => {
          let height = "h-16 md:h-20"
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
