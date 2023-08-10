import Carousel from "@/components/UI/Carousel";
import ResourceCard from "@/components/cards/ResourceCard";

import { RESOURCES } from "@/constants/resources";

export default function Resources() {
  return (
    <Carousel title="Resources">
      {RESOURCES.map((resource, i) => (
        <ResourceCard {...resource} key={`resource-${i}`} />
      ))}
    </Carousel>
  );
}
