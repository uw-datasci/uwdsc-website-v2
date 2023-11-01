// pages/eventPage.js (or eventPage.tsx)

import { useRouter } from "next/router";
import SEO from "@/components/SEO/SEO";
import EventSection from "@/components/cards/EventSection";
import { UPCOMING_EVENTS } from "@/constants/events";

function EventPage() {
  const router = useRouter();
  const { id } = router.query;
  const event = UPCOMING_EVENTS.find((event) => event.id === id);

  // if event not found or undefined
  if (!event) {
    return (
      <div>
        <p>Event not found</p>
      </div>
    );
  }

  // render event
  return (
    <div>
      <SEO title="Events" />
      <section className="mx-container mt-14 lg:mt-20 mb-20">
        <EventSection
          id={event.id}
          title={event.title}
          description={event.description}
          image={event.image}
          date={event.date}
          location={event.location}
          link={event.link}
        />
      </section>
    </div>
  );
}

export default EventPage;
