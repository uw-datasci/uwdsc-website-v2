import Image from "next/image";

import SectionTitle from "@/components/UI/SectionTitle";

import mathsoc from "@/public/logos/mathsoc.png";
import mef from "@/public/logos/mef.png";

import intact from "@/public/logos/cxc/intact.png";
import huggingface from "@/public/logos/cxc/huggingface.png";
import bdo from "@/public/logos/cxc/bdo.png";
import cyclica from "@/public/logos/cxc/cyclica.png";
import wyvern from "@/public/logos/cxc/wyvern.png";
import salesforce from "@/public/logos/cxc/salesforce.png";
import databricks from '@/public/logos/cxc/databricks.png'

const PAST_SPONSORS = [
  { name: "MathSoc", classes: "", logo: mathsoc },
  { name: "MEF", classes: "", logo: mef },
  { name: "Intact", classes: "", logo: intact },
  { name: "Cyclica", classes: "", logo: cyclica },
  { name: "Wyvern", classes: "", logo: wyvern },
  { name: "Hugging Face", classes: "", logo: huggingface },
  { name: "Salesforce", classes: "", logo: salesforce },
  { name: "Databricks", classes: "", logo: databricks },
  { name: "BDO", classes: "", logo: bdo }

];

export default function CxCSponsors() {
  return (
    <section className="mb-section mx-container">
      <SectionTitle mb="mb-12">PAST SPONSORS</SectionTitle>
      <div className="flex gap-16 lg:gap-40 justify-center flex-wrap">
        {PAST_SPONSORS.map(({ name, classes, logo }) => (
          <Image
            src={logo}
            alt={name}
            key={`${name.split(" ").join("_")}`}
            className={`h-16 md:h-20 w-auto ${classes}`}
          />
        ))}
      </div>
    </section>
  );
}
