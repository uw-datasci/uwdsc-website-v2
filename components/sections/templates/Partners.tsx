import Image from "next/image";
import Link from "next/link";
import { type Partner } from "@/types/types";
import SectionTitle from "@/components/UI/SectionTitle";
import partnersheading from "@/public/cxc/graphics/PartnersHeading.png"

type PartnersProps = {
  sectionTitle: string;
  className: string;
  partnerList: Partner[]
};

/**
 * Used to render sponsors section
 * ex. "OUR SPONSORS" on home page, "THIS YEAR'S SPONSORS" on cxc page
 */

export default function Partners({
  //sectionTitle,
  className,
  partnerList
}: PartnersProps
) {
  if (className == ""){
    className = "gap-x-40 gap-y-20"
  }
  return (
    <section className="mb-section mx-container">
      <div className="mb-20 flex justify-center">
        <Image src={partnersheading} alt="Partners Heading" />
      </div>
      {/*<SectionTitle mb="mb-20">{sectionTitle}</SectionTitle>*/}
      <div className={`flex flex-wrap justify-center ${className}`}>
        {partnerList?.map(({ name, logo, link }) => {
          let height = "h-48 md:h-44"

          return link 
            ? (
              <Link href={link} passHref key={name}>
                <Image
                  src={logo}
                  alt={name}
                  className={`w-auto ${height}`}
                />
              </Link>
            ) : (
              <Image
                src={logo}
                alt={name}
                className={`w-auto ${height}`}
                key={name}
              />
            );
        })}
      </div>
    </section>
  );
}
