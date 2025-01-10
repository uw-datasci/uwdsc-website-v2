import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { type Sponsor } from "@/types/types";
import sponsorsheading from "@/public/cxc/graphics/SponsorsHeading.png";

type SponsorsProps = {
  sectionTitle: string;
  className: string;
  sponsorList: Sponsor[];
};

/**
 * Used to render sponsors section
 * ex. "OUR SPONSORS" on home page, "THIS YEAR'S SPONSORS" on cxc page
 */

export default function Sponsors({
  //sectionTitle,
  className,
  sponsorList,
}: SponsorsProps) {
  if (className == "") {
    className = "gap-x-40 gap-y-20";
  }
  <style jsx>{`
    .animate-popout {
      animation: popout 1s ease;
    }
    .animate-popin {
      animation: popin 1s ease;
    }
    @keyframes popout {
      from {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      to {
        transform: scale();
      }
    }
    @keyframes popin {
      from {
        transform: scale(1.2);
      }
      50% {
        transform: scale(1.1);
      }
      to {
        transform: scale(1);
      }
    }
  `}</style>;
  return (
    <section className="mb-section mx-container">
      <div className="mb-20 flex justify-center">
        <Image src={sponsorsheading} alt="Sponsors Heading" />
      </div>
      {/*<SectionTitle mb="mb-20">{sectionTitle}</SectionTitle>*/}
      <div className={`flex flex-wrap justify-center ${className}`}>
        {sponsorList?.map(({ name, logo, type, link }) => {
          let hovered = false;

          let height = "h-16 md:h-20";
          if (type == "top") {
            height = "h-24 md:h-22";
          } else if (type == "dataset") {
            height = "h-15 md:h-16";
          } else if (type == "gold") {
            height = "h-12 md:h-11";
            if (name == "Intact") {
              height = "h-15 md:h-24";
            } else if (
              name == "Nomad Futurists Foundation" ||
              name == "Telus"
            ) {
              height = "h-20 md:h-24";
            }
          } else if (type == "silver") {
            height = "h-8 md:h-8";
          }

          const handleMouseEnter = () => (hovered = true);
          const handleMouseLeave = () => (hovered = false);

          const animationClass = hovered ? "animate-popout" : "animate-popin";

          return link ? (
            <Link
              href={link}
              rel="noopener noreferrer"
              target="_blank"
              key={name}
            >
              <Image src={logo} alt={name} className={`w-auto ${height}`} />
            </Link>
          ) : (
            <Image
              src={logo}
              alt={name}
              className={`w-auto ${height} ${animationClass}`}
              key={name}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </div>
    </section>
  );
}
