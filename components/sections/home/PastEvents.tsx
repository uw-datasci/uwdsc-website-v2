import { useState, useEffect } from "react";
import Carousel from "@/components/UI/Carousel";
import EventCard from "@/components/cards/EventCard";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { getPastEvents } from "@/utils/apiCalls/eventApiCalls";
import { Event } from "@/types/types";
import eventPlaceholder from "@/public/placeholder/event.png";

interface ApiEvent {
  id: string;
  name: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  imageUrl?: string;
}

interface DynamicEvent extends Event {
  _startTime?: string;
}

export default function PastEvents() {
  const [pastEvents, setPastEvents] = useState<DynamicEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getPastEvents();

        if (response.data && response.data.events) {
          // Transform API events to match Event type
          const transformedEvents: DynamicEvent[] = response.data.events.map(
            (apiEvent: ApiEvent) => {
              let eventImage = eventPlaceholder;

              if (apiEvent.imageUrl) {
                eventImage = {
                  src: apiEvent.imageUrl,
                  height: 400,
                  width: 600,
                  blurDataURL: "",
                } as any;
              }

              return {
                id: apiEvent.id,
                title: apiEvent.name,
                image: eventImage,
                _startTime: apiEvent.startTime,
              };
            },
          );

          // Sort by start time (most recent first) and limit to last 10 events
          const sortedEvents = transformedEvents
            .sort(
              (a, b) =>
                new Date((b as any)._startTime || "").getTime() -
                new Date((a as any)._startTime || "").getTime(),
            )
            .slice(0, 10);

          setPastEvents(sortedEvents);
        }
      } catch (err) {
        console.error("Error fetching past events:", err);
        setError("Failed to load past events");
      } finally {
        setLoading(false);
      }
    };

    fetchPastEvents();
  }, []);

  if (loading) {
    return (
      <section className="mb-section">
        <div className="mx-container mb-6 xl:mb-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl 2xl:text-5xl">
            Past Events
          </h2>
        </div>
        <div className="py-16 text-center">
          <LoadingSpinner size={60} />
          <p className="mt-4 text-white">Loading past events...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-section">
        <div className="mx-container mb-6 xl:mb-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl 2xl:text-5xl">
            Past Events
          </h2>
        </div>
        <div className="py-16 text-center">
          <p className="text-red">{error}</p>
        </div>
      </section>
    );
  }

  if (pastEvents.length === 0) {
    return (
      <section className="mb-section">
        <div className="mx-container mb-6 xl:mb-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl 2xl:text-5xl">
            Past Events
          </h2>
        </div>
        <div className="py-16 text-center">
          <p className="text-white">No past events found.</p>
        </div>
      </section>
    );
  }

  return (
    <Carousel title="Past Events">
      {pastEvents.map((event, i) => (
        <EventCard {...event} key={`event-${event.id || i}`} />
      ))}
    </Carousel>
  );
}
