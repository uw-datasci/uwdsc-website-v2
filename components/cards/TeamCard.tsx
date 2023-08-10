import Image from "next/image";

import { Mail, Globe, Instagram, Linkedin } from "react-feather";

import { type Member } from "@/types/types";

type TeamCardProps = Member;

export default function TeamCard({
  name,
  position,
  image,
  email,
  website,
  instagram,
  linkedin,
}: TeamCardProps) {
  return (
    <div className="transition-300 w-full rounded-2xl border border-grey3 px-6 pb-8 pt-7 text-center hover:border-grey2 3xs:w-[240px] xl:w-[280px] xl:rounded-4xl">
      <Image
        src={image}
        alt={name}
        className="mb-6 inline-block aspect-square w-32 rounded-lg object-cover xl:w-40"
      />
      <h4 className="mb-2.5 text-xl font-semibold text-white xl:text-2xl">
        {name}
      </h4>
      <p className="mb-4 font-medium text-grey2 xl:text-lg">{position}</p>
      <div className="flex justify-center gap-5">
        {email && (
          <a href={`mailto:${email}`} target="_blank" rel="noreferrer noopener">
            <Mail className="transition-300 text-grey2 hover:text-grey1" />
          </a>
        )}
        {website && (
          <a href={website} target="_blank" rel="noreferrer noopener">
            <Globe className="transition-300 text-grey2 hover:text-grey1" />
          </a>
        )}
        {instagram && (
          <a href={instagram} target="_blank" rel="noreferrer noopener">
            <Instagram className="transition-300 text-grey2 hover:text-grey1" />
          </a>
        )}
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noreferrer noopener">
            <Linkedin className="transition-300 text-grey2 hover:text-grey1" />
          </a>
        )}
      </div>
    </div>
  );
}
