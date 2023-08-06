import Carousel from '@/components/UI/Carousel';
import EventCard from '@/components/cards/EventCard';

import { PAST_EVENTS } from '@/constants/events';

export default function PastEvents() {
  return (
    <Carousel title='Past Events'>
      {PAST_EVENTS.map((event, i) => (
        <EventCard {...event} key={`event-${i}`} />
      ))}
    </Carousel>
  );
}
