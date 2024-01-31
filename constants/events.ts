import { Event, Photo } from "@/types/types";

// import event from "@/public/placeholder/event.png";
import eot from "@/public/events/eot.png";
import hatch from "@/public/pastEvents/event-hatch.png";
import janeStreet from "@/public/pastEvents/event-jane-street.png";
import cohere from "@/public/pastEvents/event-cohere.png";
import cohereWorkshop from "@/public/pastEvents/event-cohere-workshop.png";
import techyon from "@/public/pastEvents/event-techyon.png";
import bdo from "@/public/pastEvents/event-bdo.png";
import sectors from "@/public/pastEvents/event-sectors.png";
import c0 from "@/public/cxc/c0.png";
import c1 from "@/public/cxc/c1.jpg";
import c2 from "@/public/cxc/c2.jpg";
import c3 from "@/public/cxc/c3.jpg";
import c4 from "@/public/cxc/c4.jpg";


export const UPCOMING_EVENTS: Event[] = [
  {
    id: "0",
    title: "End of Term",
    description:
      "Gear up for an epic battle of wits at our Estimathon by Jane Street, our End Of Term event! Food will be from Bao Sandwich Bar.",
    image: eot,
    date: "6-7pm, Mon, Nov 20",
    location: "STC 0050",
  },
];

export const PAST_EVENTS: Event[] = [
  {
    id: "1",
    title: "Hatch Fireside Chat",
    image: hatch,
  },
  {
    id: "2",
    title: "Jane Street Estimathon",
    image: janeStreet,
  },
  {
    id: "3",
    title: "Cohere Hackathon",
    image: cohere,
  },
  {
    id: "4",
    title: "Techyon Datathon ",
    image: techyon,
  },
  {
    id: "5",
    title: "BDO Datathon",
    image: bdo,
  },
  {
    id: "6",
    title: "DS Across Sectors",
    image: sectors,
  },
  {
    id: "7",
    title: "Cohere Workshop",
    image: cohereWorkshop,
  }
];

export const PAST_CXC: Photo[] = [
  {
    id: "3",
    title: "c3",
    image: c3,
  },
  {
    id: "1",
    title: "c1",
    image: c1,
  },
  {
    id: "2",
    title: "c2",
    image: c2,
  },
  
  {
    id: "4",
    title: "c4",
    image: c4,
  }
]
