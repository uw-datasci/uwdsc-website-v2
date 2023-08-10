import GradientBorder from "./GradientBorder";
import { AiFillCheckCircle } from "react-icons/ai";

export type sponsorTierType = {
  tierName: string;
  tierColor: string;
  description: string;
  perks: string[];
  value: number;
};

export default function SponsorTier({
  tierName,
  tierColor,
  description,
  perks,
  value,
}: sponsorTierType) {
  return (
    <GradientBorder rounded="rounded-lg mx-auto md:mx-1 my-5 h-full w-3/4 lg:w-1/4 lg:min-w-[270px] xl:mx-4 2xl:min-w-[350px]">
      <div className="rounded-lg bg-black h-full text-center p-2">
        <h2 className={`${tierColor} text-xl lg:text-3xl font-bold`}>{tierName}</h2>
        <div className="text-white text-sm m-2 min-h-[70px]">{description}</div>
        <ul className="text-white text-md m-2 min-h-[150px]">
          {perks.map((perk) => (
            <li className="flex items-center p-1">
              <AiFillCheckCircle className="w-4 text-green mr-2" />
              {perk}
            </li>
          ))}
        </ul>
        <div className="text-white font-bold text-7xl mb-2 font-display">{`$${value}+`}</div>
      </div>
    </GradientBorder>
  );
}
