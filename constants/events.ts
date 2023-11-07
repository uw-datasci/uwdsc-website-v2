import { Event } from "@/types/types";

import event from "@/public/placeholder/event.png";
import system from "@/public/events/system.png";
import reading from "@/public/events/reading.png";
import workshop from "@/public/events/workshop.png";

export const UPCOMING_EVENTS: Event[] = [
  {
    id: "0",
    title: "Info + Networking",
    description:
      "Join us for an informative and networking session with Point 72 - Cubist Systematic Strategies!",
    image: system,
    date: "6-7pm, Wed, Nov 8",
    location: "STC 0050",
  },
  {
    id: "1",
    title: "Reinforcement",
    description:
      "Get ready to build your own intelligent agent and  simulate your RL agent using Pytorch and OpenAI's Gym! ",
    image: workshop,
    date: "6:30-8pm, Thurs, Nov 9",
    location: "MC 5501",
  },
  {
    id: "2",
    title: "Reading Group",
    description:
      "This reading group is going to cover topics about diffusion models! The link is available on our instagram!",
    image: reading,
    date: "6-7pm, Sunday, Nov 12",
    location: "zoom",
  },
];

// export const PAST_EVENTS: Event[] = [
//   {
//     id: "1",
//     title: "E-Leetcoding",
//     image: event,
//   },
//   {
//     id: "2",
//     title: "E-Leetcoding",
//     image: event,
//   },
//   {
//     id: "3",
//     title: "E-Leetcoding",
//     image: event,
//   },
//   {
//     id: "4",
//     title: "E-Leetcoding",
//     image: event,
//   },
//   {
//     id: "5",
//     title: "E-Leetcoding",
//     image: event,
//   },
//   {
//     id: "6",
//     title: "E-Leetcoding",
//     image: event,
//   },
// ];
