import { Event } from "@/types/types";

import event from "@/public/placeholder/event.png";
import system from "@/public/events/system.png";
import reading from "@/public/events/reading.png";
import regress from "@/public/events/regress.png";

export const UPCOMING_EVENTS: Event[] = [
  {
    id: "0",
    title: "Regress vs Classify",
    description:
      "Unlock the Power of Regression and Classification: A Workshop for Predictive and Exploratory Analytics!",
    image: regress,
    date: "6-7:30pm, Thurs, Nov 2",
    location: "MC 5501",
  },
  {
    id: "1",
    title: "Reading Group",
    description:
      "This week's reading group is about gaming and reinforcement learnings! The link is available on our instagram!",
    image: reading,
    date: "6-7pm, Sunday, Nov 5",
    location: "zoom",
  },
  {
    id: "2",
    title: "Info + Networking",
    description:
      "Join us for an informative and networking session with Point 72 - Cubist Systematic Strategies!",
    image: system,
    date: "6-7pm, Wed, Nov 8",
    location: "STC 0050",
  },
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
