import Image, { type StaticImageData } from "next/image";

type WhatWeDoCardProps = {
  title: string;
  description: string;
  graphic: StaticImageData;
};

export default function WhatWeDoCard({
  title,
  description,
  graphic,
}: WhatWeDoCardProps) {
  return (
    <div className="transition-300 group relative flex aspect-[3/2] flex-col justify-end overflow-hidden rounded-3xl border border-grey3 px-6 pb-8 hover:border-grey2">
      <div>
        <h4 className="mb-2 text-2xl font-bold text-white">{title}</h4>
        <p className="transition-300 leading-loose text-grey2 group-hover:text-grey1 xl:text-lg">
          {description}
        </p>
      </div>
      <Image
        src={graphic}
        alt={title}
        className="transition-300 absolute -right-[10%] -top-[10%] -z-10 w-[60%] opacity-20 group-hover:opacity-40"
      />
    </div>
  );
}
