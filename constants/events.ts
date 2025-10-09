import { Event, Photo } from "@/types/types";

import eot from "@/public/events/eot.png";

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
  },
];
