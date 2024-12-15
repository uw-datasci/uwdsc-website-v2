// Registratino page here

import React from "react";
const building = require("../../public/cxc/asset-building.png");
const spacer = require("../../public/cxc/asset-spacer.png");
import Image from "next/image";

export default function Registration() {
  return (
    <div className="relative left-0 top-0 z-[-1] min-h-screen w-full font-jersey text-white">
      <div className="absolute left-0 top-0 z-[-1] min-h-full w-full [background:linear-gradient(180deg,rgb(16.89,16.94,20.17)_0%,rgb(33.28,35.19,148.31)_200%)]"></div>
      <div className="mx-auto flex flex-col items-center justify-center">
        <div className="text-xl leading-none tracking-[0.05em] lg:text-6xl lg:tracking-[0.1em]">
          UWDSC Presents
        </div>
        <div className="leading-1 text-3xl tracking-[0.1em] lg:text-10xl lg:tracking-[0.2em]">
          A DATA SCIENCE HACKATHON
        </div>
        <div className="flex flex-row items-center justify-center gap-4 text-7xl lg:gap-8 lg:text-[120px]">
          <span>2</span>
          <span>0</span>
          <Image
            src={spacer}
            alt=""
            className="inline-block h-full max-h-[1em] w-auto align-middle"
          />

          <span>C</span>
          <span>x</span>
          <span>C</span>
          <Image
            src={spacer}
            alt=""
            className="inline-block h-full max-h-[1em] w-auto align-middle"
          />

          <span>2</span>
          <span>5</span>
        </div>
      </div>
      {/* 
      
      FORM GOES HERE 
      = If filled out, show success message and say we'll be in touch soon
      - If not filled out, show form
      
      */}
      <Image src={building} alt="" className="bottom-0 w-full" />
    </div>
  );
}
