import CarouselGallery from "@/components/UI/CarouselGallery";
import pastcxcheading from "@/public/cxc/graphics/PastCxCHeading.png"
import Image from "next/image";

import { PAST_CXC } from "@/constants/events";

export default function PastCxC() {
  return (
    <div>
      <div className="mb-10 flex justify-center">
          <Image src={pastcxcheading} alt="Past CxC Heading" />
      </div>
      <CarouselGallery title="" images={PAST_CXC}/>
    </div>
  );
}
