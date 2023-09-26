import { Event } from "@/types/types";

import event from "@/public/placeholder/event.png";
import dataViz from "@/public/events/dataViz.png";
import bot from "@/public/events/bot.png";
import leetcoding from "@/public/events/leetcoding.png";

export const UPCOMING_EVENTS: Event[] = [
  {
    id: "1",
    title: "E-Leetcoding - Dynamic Programming",
    description: `Applying for co-op? Need help prepping for interviews? 
    Introducing E-leet Coding - your one-stop guide to technical interviews!
    ~ # Discuss, practice, and walkthrough leetcode questions with other students as well as our speakers Peter Szczeszynski and Md. Abdul Chowdhury!
    Join us on September 26th at 6:00p.m - learn to ace that technical interview at your dream job!
    We can't wait to see you guys!`,
    image: leetcoding,
    date: "6pm, Tues, Sept 26",
    location: "MC 4040",
  },
  {
    id: "2",
    title: "Data Viz Workshop & Challenge",
    description:
      "Join our workshop! Submit your data viz to our coming week-long contest for a chance to win! 1st place will wiin a DSC crewneck and 2nd, 3rd place will win Sweet Dreams gift cards.",
    image: dataViz,
    date: "6:30-7:30pm, Wed, Sept 27",
    location: "MC Comfy",
  },
  {
    id: "3",
    title: "BOT + After Party Social",
    image: bot,
    date: "6-7pm, Mon, Oct 2",
    location: "STC 0050",
  },
  {
    id: "4",
    title: "Quant Webinar",
    description:
      "Interested in quant trading? Join us on October 4th, 6pm, to learn about the different career paths and interview questions with Vici. We will start with an overview of quant finance, dive into the differences between quant hedge funds and proprietary trading firms, run a case study, and discuss the application and interview processes. Vici is a collective of quants, traders, and devs who are passionate about teaching. We mentor campus and experienced talent through the lifecycle of their careers, from breaking into trading to excelling at their roles. The presenters will be experienced traders, including a UW alum!",
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
