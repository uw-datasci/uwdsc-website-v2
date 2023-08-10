import Carousel from "@/components/UI/Carousel";
import EventCard from "@/components/cards/EventCard";

import { UPCOMING_EVENTS } from "@/constants/events";

export default function UpcomingEvents() {
  return (
    <Carousel title="Upcoming Events">
      {UPCOMING_EVENTS.map((event, i) => (
        <EventCard {...event} key={`event-${i}`} />
      ))}
    </Carousel>
  );
}
