import { Event } from "@/types/types";

import event from "@/public/placeholder/event.png";
import dataViz from "@/public/events/dataViz.png";
import upper from "@/public/events/upper_year.png";
import system from "@/public/events/system.png";

export const UPCOMING_EVENTS: Event[] = [
  {
    id: "1",
    title: "Data Viz Workshop",
    description:
      "Submit your data viz to our coming week-long contest for a chance to win! 1st place will win a DSC crewneck!",
    image: dataViz,
    date: "Deadline: Oct 24!",
    location: "MC Comfy",
  },
  {
    id: "2",
    title: "Upper Year Panel",
    description: "Feeling stressed out from co-op search? Gain valuable co-op insights from upper-years!",
    image: upper,
    date: "6-7:30pm, Wed, Oct 25",
    location: "TBD",
  },
  {
    id: "3",
    title: "Info + Networking",
    description:
      "Join us for an informative and networking session with Point 72 - Cubist Systematic Strategies!",
    image: system,
    date: "6-7pm, Wed, Nov 8",
    location: "TBD",
  },
  // {
  //   id: "5",
  //   title: "E-Leetcoding",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
  //   image: event,
  //   date: "6-7pm, Thurs, Dec 27",
  //   location: "MC 3034",
  // },
  // {
  //   id: "6",
  //   title: "E-Leetcoding",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
  //   image: event,
  //   date: "6-7pm, Thurs, Dec 27",
  //   link: "https://www.youtube.com",
  // },
];

export const PAST_EVENTS: Event[] = [
  {
    id: "1",
    title: "E-Leetcoding",
    image: event,
  },
  {
    id: "2",
    title: "E-Leetcoding",
    image: event,
  },
  {
    id: "3",
    title: "E-Leetcoding",
    image: event,
  },
  {
    id: "4",
    title: "E-Leetcoding",
    image: event,
  },
  {
    id: "5",
    title: "E-Leetcoding",
    image: event,
  },
  {
    id: "6",
    title: "E-Leetcoding",
    image: event,
  },
];
