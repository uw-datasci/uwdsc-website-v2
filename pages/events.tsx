import React from "react";
import { Event } from "@/types/types";
import EventCard from "@/components/cards/EventCard";
import { UPCOMING_EVENTS } from "@/constants/events";
import SectionTitle from "@/components/UI/SectionTitle";

export default function Events() {
  return (
    <>
      {UPCOMING_EVENTS.map((event) => (
        <div key={event.id}>
          <SectionTitle mb="mb-12">{event.title}</SectionTitle>
          <div className="flex flex-wrap justify-center gap-8 3xs:gap-12 xl:gap-20">
            
          </div>
        </div>
      ))}
    </>
  );
}
