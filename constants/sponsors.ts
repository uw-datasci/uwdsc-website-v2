import { type SponsorTier } from "@/types/types";
import { type Sponsor, type Partner } from "@/types/types";

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
import federato from "@/public/logos/cxc_2025/federato.svg"
import touchbistro from "@/public/logos/cxc_2025/touchbistro.png"
import nomadfuturists from "@/public/logos/cxc_2025/NomadFuturistLogo.png"
import telus from "@/public/logos/cxc_2025/teluslogo.png"
import runql from "@/public/logos/cxc_2025/runql.png"
import sap from "@/public/logos/cxc_2025/sap.png"

// 2025 CxC Partners
import hackthe6ix from "@/public/logos/cxc_2025/HackThe6ixLogo.png"
import pearvc from "@/public/logos/cxc_2025/pear_vc_logo.jpeg"
import geesehacks from "@/public/logos/cxc_2025/geesehacks.png"
import communitech from "@/public/logos/cxc_2025/communitech.png";
import mathsoc_cxc from "@/public/logos/cxc_2025/mathsoc-logo.png";

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
  { name: "Federato", logo: federato, type:"top" , link:"https://www.federato.ai/"},
  { name: "MEF", logo: MEF, type:"top", link:"https://uwaterloo.ca/math-endowment-fund/"},
  { name: "Telus", logo: telus, type:"gold", link:"https://www.telus.com/en" },
  { name: "Intact", logo: intact, type:"gold" , link:"https://www.intact.ca/en/personal-insurance"},
  { name: "Touch Bistro", logo: touchbistro, type:"dataset", link:"https://www.touchbistro.com/" },
  { name: "SAP", logo: sap, type:"dataset", link:"https://www.sap.com/" },
  { name: "RunQL", logo: runql, type:"dataset", link:"https://www.runql.com/" },
  
  // Gold Sponsors
  { name: "Nomad Futurists Foundation", logo: nomadfuturists, type:"gold", link:"https://nomadfuturist.org/"}
];

export const CURRENT_CXC_PARTNERS: Partner[] = [
  { name: "HackThe6ix", logo: hackthe6ix, link:"https://hackthe6ix.com/"},
  { name: "Techyon", logo: techyon, link: "https://techyon.org/"},
  { name: "PearVC", logo: pearvc, link: "https://pear.vc/"},
  { name: "GeeseHacks", logo: geesehacks, link: "https://geesehacks.com/"},
 { name: "Communitech", logo: communitech, link: "https://www.communitech.ca/"}
 { name: "MathSoc", logo: mathsoc_cxc, link: "https://mathsoc.uwaterloo.ca/"}
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
