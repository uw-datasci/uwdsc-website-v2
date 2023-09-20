import React from "react";
import { Event } from "@/types/types";
import EventCard from "@/components/cards/EventCard";
import { UPCOMING_EVENTS } from "@/constants/events";
import SectionTitle from "@/components/UI/SectionTitle";
import SEO from "@/components/SEO/SEO";
import EventSection from "@/components/cards/EventSection"


export default function Events() {
  return (
    <>
			{UPCOMING_EVENTS.map((event) => (
						<div key={event.id}>
							<SEO title="Events" />
								<section className="mx-container mb-section mt-14 lg:mt-20">
									
									<EventSection id={event.id} title={event.title} description={event.description} image={event.image} date={event.date} location={event.location} link={event.link} />
									
								</section>
							
							<div className="flex flex-wrap justify-center gap-8 3xs:gap-12 xl:gap-20">
								
							</div>
						</div>
					))}
			
      
    </>
  );
}
