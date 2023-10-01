import { Event } from "@/types/types";

import event from "@/public/placeholder/event.png";
import dataViz from "@/public/events/dataViz.png";
import bot from "@/public/events/bot.png";
import leetcoding from "@/public/events/leetcoding.png";

export const UPCOMING_EVENTS: Event[] = [
  {
    id: "1",
    title: "E-Leetcoding",
    description: "E-leet Coding: Your go-to for tech interview prep! Join Peter Szczeszynski, Md. Abdul Chowdhury for LeetCode discussions!",
    image: leetcoding,
    date: "6pm, Tues, Sept 26",
    location: "MC 4040",
  },
  {
    id: "2",
    title: "Data Viz Workshop",
    description:
      "Submit your data viz to our coming week-long contest for a chance to win! 1st place will win a DSC crewneck!",
    image: dataViz,
    date: "6:30-7:30pm, Wed, Sept 27",
    location: "MC Comfy",
  },
  {
    id: "3",
    title: "BOT",
    description: "Join us for an exciting start to the term, where you can make new friends and expand your network in DSC!",
    image: bot,
    date: "6-7pm, Mon, Oct 2",
    location: "STC 0050",
  },
  {
    id: "4",
    title: "Quant Webinar",
    description:
      "Explore quant trading careers with Vici. Learn about quant finance, hedge funds, case studies, and meet experienced traders!",
    image: event,
    date: "6pm, Wed, Oct 4",
    location: "MC Comfy",
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
