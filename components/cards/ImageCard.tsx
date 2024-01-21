import Image from "next/image";

import { Mail, Globe, Instagram, Linkedin } from "react-feather";

import { type Member } from "@/types/types";

type TeamCardProps = Member;

export default function ImageCard({
  id,
  image,
}: TeamCardProps) {
  return (
   <div className="w-[450px] overflow-hidden rounded-4xl border border-grey3 md:w-[750px]">
      <Image src={image} alt={id} className="aspect-[7/4] object-cover" />
    </div>
  );
}
