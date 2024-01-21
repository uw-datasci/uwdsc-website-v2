import Carousel from "@/components/UI/Carousel";
import EventCard from "@/components/cards/EventCard";
import ImageCard from "@/components/cards/ImageCard";
import CarouselGallery from "@/components/UI/CarouselGallery";

import { PAST_CXC } from "@/constants/events";

export default function PastCxC() {
  return (
    <CarouselGallery title="CxC Winter 2023" images={PAST_CXC}/>
  );
}
