import { type SponsorTier } from "@/types/types";
import { type Sponsor } from "@/types/types";

import mathsoc from "@/public/logos/mathsoc.png";
import mef from "@/public/logos/mef.png";
import techyon from "@/public/logos/techyon.png";
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
import MEF from "@/public/logos/mef.png";
import WUSA from "@/public/logos/cxc_2024/wusa.png";
import Fidelity from "@/public/logos/cxc_2024/Fidelity.png";
import Architech from "@/public/logos/cxc_2024/Architech.png";
import Boomerang from "@/public/logos/cxc_2024/Boomerang.png";
import Interac from "@/public/logos/cxc_2024/Interac.png";
import LiveAssets from "@/public/logos/cxc_2024/LiveAssets.png";
import FluidAI from "@/public/logos/cxc_2024/FluidAI.svg";
import Ecapital from "@/public/logos/cxc_2024/Ecapital.png";

// 2025 New Sponsors
import federato from "@/public/logos/cxc_2025/federato.png"
import chapa from "@/public/logos/cxc_2025/chapa.png"
import touchbistro from "@/public/logos/cxc_2025/touchbistro.png"

/*
 * Constent data for SPONSORS lists, and SPONSOR_TIERS
 */

export const CURRENT_SPONSORS: Sponsor[] = [
  { name: "MathSoc", logo: mathsoc },
  { name: "MEF", logo: mef },
  { name: "Techyon", logo: techyon, link: "https://techyon.org/"}
];

export const CURRENT_CXC_SPONSORS: Sponsor[] = [
  // Top Sponsors
  { name: "Federato", logo: federato, type:"top" },
  { name: "MEF", logo: MEF, type:"top" },
  { name: "WUSA", logo: WUSA, type:"top" },
  { name: "Chapa", logo: chapa, type:"top" },
  
  // Dataset Sponsors
  { name: "Touch Bistro", logo: touchbistro, type:"dataset" },

  // Gold Sponsors
  { name: "Intact", logo: intact, type:"gold" },
  //{ name: "iMiller", logo: Fidelity, type:"gold"},
];

export const PAST_SPONSORS: Sponsor[] = [
  { name: "MathSoc", logo: mathsoc, type:"" },
  { name: "MEF", logo: mef, type:"" },
  { name: "Intact", logo: intact, type:"" },
  { name: "Cyclica", logo: cyclica, type:"" },
  { name: "Wyvern", logo: wyvern, type:"" },
  { name: "Hugging Face", logo: huggingface, type:"" },
  { name: "Salesforce", logo: salesforce, type:"" },
  { name: "Databricks", logo: databricks, type:"" },
  { name: "BDO", logo: bdo, type:"" },
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
