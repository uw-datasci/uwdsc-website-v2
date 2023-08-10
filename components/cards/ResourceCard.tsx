import Button from "@/components/UI/Button";
import GradientBorder from "@/components/UI/GradientBorder";

import { type Resource } from "@/types/types";

type ResourceCardProps = Resource;

export default function ResourceCard({
  title,
  description,
  link,
}: ResourceCardProps) {
  return (
    <div className="relative w-[300px] overflow-hidden whitespace-normal rounded-4xl border border-grey3 md:w-[360px]">
      <div className="bg-gradient absolute inset-0 opacity-10" />
      <div className="relative px-6 pb-8 pt-5">
        <h4 className="mb-2 text-2xl font-bold text-white md:text-3xl">
          {title}
        </h4>
        <p className="mb-7 text-sm leading-loose text-grey1 md:text-md">
          {description}
        </p>
        <GradientBorder rounded="rounded-md">
          <Button
            type="link"
            href={link}
            hierarchy="secondary"
            font="font-bold"
            rounded="rounded-md"
            classes="w-full"
          >
            Learn More
          </Button>
        </GradientBorder>
      </div>
    </div>
  );
}
