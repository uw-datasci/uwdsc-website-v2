import { Blog } from "@/types/types";

import blog from "@/public/placeholder/blog.png";
import ai_bots from "@/public/blogs/ai_bots.png";

export const BLOGS: Blog[] = [
  {
    id: "1",
    title: "Can Artificial Intelligence Bots Sail Better than Humans?",
    description:
      "Yes, sometimes. Let’s dig in deeper with the help of a highly successful case study.",
    image: ai_bots,
    link: "https://medium.com/@waterloodatascience/can-artificial-intelligence-bots-sail-better-than-humans-e24ae73b2097",
    label: "Artificial Intelligence",
  },
  {
    id: "2",
    title: "An Introduction to NumPy Fundamentals",
    description:
      "NumPy is a quintessential tool in any data scientist’s toolbox- it enables fast data preprocessing and exploration through the data structures it provides. NumPy has a bit of a learning curve, but this article will aim to dissect the essentials and make them beginner-friendly!",
    image: blog,
    link: "https://medium.com/@waterloodatascience/an-introduction-to-numpy-fundamentals-c343c7ecfd41",
    label: "Data Science Fundamentals",
  },
];
