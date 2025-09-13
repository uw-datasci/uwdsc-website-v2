"use client";

import { useEffect, useState } from "react";
import { ChevronUp, PlaneTakeoff, Stamp } from "lucide-react";
import { CiPassport1 } from "react-icons/ci";
import { AnimatePresence, motion } from "framer-motion";
import { Poppins } from "next/font/google";
import EventSnippet from "./EventSnippet";
import { getEventById} from "@/utils/apiCalls/eventApiCalls";
import { getAllFutureEvents } from "@/utils/apiCalls/eventApiCalls";
import { UserInfo } from "@/pages/memCheckIn";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface EventPassportProps {
  userInfo: UserInfo;
}

interface Event {
  name: string;
  startTime: string;
  location: string;
}
export default function EventPassport(props: EventPassportProps) {
  const [expanded, setExpanded] = useState(false);
  const events: string[] = props.userInfo.eventList;
  const [eventsAttended, setEventsAttended] = useState<Event[]>();
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>();

  // fetch events attended by user and upcoming events
  useEffect(() => {
    const fetchEventsAttended = async () => {
      if (events.length > 0) {
        try {
          const responses = await Promise.all(
            events.map(async (eventId) => {
              const res = await getEventById(eventId);
              return res.data;
            }),
          );
          if (responses) {
            setEventsAttended(responses.reverse());
          } else {
            setEventsAttended([]);
          }
        } catch (error: any) {
          console.log("Error fetching events attended by user:", error);
        }
      }
    };

    const fetchUpcomingEvents = async () => {
      try {
        const response = await getAllFutureEvents();
        if (response.data) {
          setUpcomingEvents(response.data);
        }
      } catch (error: any) {
        console.log("Error fetching upcoming events:", error);
      }
    };
    fetchUpcomingEvents();
    fetchEventsAttended();
  }, []);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  // toggle overflow for background when modal pops up
  useEffect(() => {
    if (expanded) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [expanded]);

  // format date in MM-DD-YYYY for event snippets
  const formatDate = (d: string) => {
    const date = new Date(d);
    const month = date.toLocaleString("en-US", {
      month: "short",
      timeZone: "UTC",
    });
    const day = String(date.getUTCDate()).padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${month} ${day}, ${year}`;
  };

  return (
    <>
      {/* Expandable panel to show passport */}
      <div
        className={`${expanded ? "invisible" : ""} ${
          poppins.className
        } bg-gradient-blue h-full w-full max-w-md cursor-pointer rounded-tl-lg rounded-tr-lg border-x-2 border-t-2 border-[#FFF7F780] border-opacity-50 bg-cover p-5 backdrop-blur-md`}
        onClick={toggleExpanded}
      >
        <div className="flex flex-row items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3B477A]">
            <CiPassport1 className="h-8 w-8 text-white" strokeWidth={1} />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between">
              <p className="text-xl font-semibold text-white">Event Passport</p>
              <ChevronUp className="h-8 w-8 text-white" strokeWidth={1.75} />
            </div>
            <h2 className="text-sm text-white opacity-70">
              View your event history & stamps
            </h2>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <>
            {/* black overlay background */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={toggleExpanded} // Click outside to close
            />
            {/* passport */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`${poppins.className} fixed inset-x-0 bottom-0 z-50 mx-auto flex h-[91vh] w-full max-w-md flex-col overflow-hidden rounded-t-2xl bg-black text-white`}
            >
              {/* scrollable content inside */}
              <div className="flex-1 overflow-y-auto bg-cover bg-center">
                <div className="flex h-[30%] w-full flex-col items-center justify-center gap-1 bg-[url('/membershipCard/whale_bg.svg')] bg-cover bg-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#03135C]/70">
                    <CiPassport1
                      className="h-6 w-6 text-white"
                      strokeWidth={1}
                    />
                  </div>
                  <p className="text-xl font-semibold">EVENTS PASSPORT</p>
                  <p className="text-sm text-[#D1DCF5]">UWDSC</p>
                  <div className="my-1 flex h-[35%] w-[40%] flex-col items-center justify-center rounded-md border-[1px] border-white/30 bg-[#12B981BF]/75">
                    <p className="text-xl font-extrabold">{events.length}</p>
                    <p className="text-sm font-light">events attended</p>
                  </div>
                </div>
                <div className="flex justify-end border-b-[1px] border-dashed border-white/40 bg-[#0E1D47] py-2 pr-3 text-sm font-light text-white/60">
                  EVENTS RECORD
                </div>
                {/* upcoming events */}
                <div className="border-b-[1px] border-[#FFFFFF4D]/30 p-5">
                  <div className="mb-3 flex flex-row items-center gap-3">
                    <PlaneTakeoff className="h-7 w-7" strokeWidth={1.75} />
                    <p className="text-xl font-semibold">UPCOMING DEPARTURES</p>
                  </div>
                  {/* upcoming events list */}
                  <div className="flex max-h-44 flex-col gap-3 overflow-y-auto">
                    {upcomingEvents && upcomingEvents.length === 0 && (
                      <p className="py-5 text-center text-xl font-light">
                        No Upcoming Events
                      </p>
                    )}
                    {upcomingEvents?.map((e, i) => (
                      <EventSnippet
                        key={i}
                        name={e.name}
                        date={formatDate(e.startTime)}
                        location={e.location}
                      />
                    ))}
                  </div>
                </div>
                {/* events attended */}
                <div className="p-5">
                  <div className="mb-3 flex flex-row items-center gap-3">
                    <Stamp className="h-7 w-7" strokeWidth={1.75} />
                    <p className="text-xl font-semibold">ENTRY STAMPS</p>
                  </div>
                  {/* upcoming events list */}
                  <div
                    className={`flex ${
                      upcomingEvents && upcomingEvents?.length < 2
                        ? "max-h-[275px]"
                        : "max-h-44"
                    } flex-col gap-3 overflow-y-auto`}
                  >
                    {events.length === 0 && (
                      <p className="py-5 text-center text-xl font-light">
                        No Events Attended
                      </p>
                    )}
                    {eventsAttended?.map((e, i) => (
                      <EventSnippet
                        key={i}
                        name={e.name}
                        date={formatDate(e.startTime)}
                        location={e.location}
                        stampSvgUrl="/membershipCard/approve_stamp.svg"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
