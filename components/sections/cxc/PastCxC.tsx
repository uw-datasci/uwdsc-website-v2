import CarouselGallery from "@/components/UI/CarouselGallery";

import { PAST_CXC } from "@/constants/events";

export default function PastCxC() {
  return (
    <CarouselGallery title="Past CxC" images={PAST_CXC}/>
  );
}
