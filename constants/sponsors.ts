import { type SponsorTier } from "@/types/types";

import mathsoc from "@/public/logos/mathsoc.png";
import mef from "@/public/logos/mef.png";
import intact from "@/public/logos/cxc/intact.png";
import huggingface from "@/public/logos/cxc/huggingface.png";
import bdo from "@/public/logos/cxc/bdo.png";
import cyclica from "@/public/logos/cxc/cyclica.png";
import wyvern from "@/public/logos/cxc/wyvern.png";
import salesforce from "@/public/logos/cxc/salesforce.png";
import databricks from "@/public/logos/cxc/databricks.png";

export const PAST_SPONSORS = [
  { name: "MathSoc", logo: mathsoc },
  { name: "MEF", logo: mef },
  { name: "Intact", logo: intact },
  { name: "Cyclica", logo: cyclica },
  { name: "Wyvern", logo: wyvern },
  { name: "Hugging Face", logo: huggingface },
  { name: "Salesforce", logo: salesforce },
  { name: "Databricks", logo: databricks },
  { name: "BDO", logo: bdo },
];

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    id: "silver",
    name: "Silver",
    color: "bg-gradient-to-b gradient-text from-[#FFFFFF20] to-white",
    description:
      "Communicate and have more exposure to our diverse pool of attendees!",
    perks: [
      "Sponsor Booth",
      "Distribute Swag",
      "Host workshops/demos",
      "Logo on posters",
    ],
    value: 500,
  },
  {
    id: "gold",
    name: "Gold",
    color: "bg-gradient-to-b gradient-text from-[#FFD700] to-white",
    description:
      "Companies that donate datasets are automatically gold sponsors!",
    perks: [
      "Dedicated social media post",
      "Dedicated speaking time",
      "Send emails to attendees",
      "Silver benefits",
    ],
    value: 1000,
  },
  {
    id: "platinum",
    name: "Platinum",
    color: "bg-gradient-to-b gradient-text from-[#A9A9A9] to-white",
    description: "The higest level, the highest recognition and promotion!",
    perks: ["Title Sponsor", "Gold Benefits", "Logo on posters"],
    value: 3000,
  },
];
