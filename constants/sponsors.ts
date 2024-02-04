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
import EY from "@/public/logos/cxc_2024/EY.png";
import IIS from "@/public/logos/cxc_2024/IIS.png";
import OwnersBox from "@/public/logos/cxc_2024/OwnersBox.png";
import Quadreal from "@/public/logos/cxc_2024/Quadreal.png";

export const CURRENT_SPONSORS = [
  { name: "MathSoc", logo: mathsoc },
  { name: "MEF", logo: mef }
];

export const CURRENT_CXC_SPONSORS = [
  // Top Sponsors
  { name: "EY", logo: EY, type:"top" },
  // { name: "MEF", logo: MEF, type:"top" },
  // { name: "WUSA", logo: WUSA, type:"top" },
  
  // // Dataset Sponsors
  // { name: "OwnersBox", logo: OwnersBox, type:"dataset" },
  // { name: "Infinite Investments", logo: IIS, type:"dataset"},
  // { name: "Quadreal", logo: Quadreal, type:"dataset" },

  // // Gold Sponsors
  // { name: "Interac", logo: Interac, type:"gold" },
  // { name: "Fidelity", logo: Fidelity, type:"gold"},
  // { name: "Architech", logo: Architech, type:"gold" },
  // { name: "Boomerang", logo: Boomerang, type:"gold" },
  // { name: "Live Assets", logo: LiveAssets, type:"gold" },

  // // Gold Sponsors
  // { name: "FluidAI", logo: FluidAI, type:"silver" },
  // { name: "ECapital", logo: ECapital, type:"silver"},
];

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
