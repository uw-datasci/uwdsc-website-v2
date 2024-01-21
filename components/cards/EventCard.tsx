import Image from "next/image";
import { Clock, Link, MapPin } from "react-feather";

import { type Event } from "@/types/types";

type EventCardProps = Event;

export default function EventCard({
  title,
  description,
  image,
  date,
  location,
  link,
}: EventCardProps) {
  return (
    <div className="w-[300px] overflow-hidden rounded-4xl border border-grey3 md:w-[360px]">
      <Image src={image} alt={title} className="aspect-[3/2] object-cover" />
      <div className="relative whitespace-normal">
        <div className="bg-gradient absolute inset-0 opacity-10" />
        <div className="relative px-6 pb-8 pt-5">
          <h4
            className={`text-2xl font-bold text-white md:text-3xl ${
              description ? "mb-2" : ""
            }`}
          >
            {title}
          </h4>
          {description && (
            <p className="mb-5 line-clamp-3 text-sm leading-loose text-grey1 md:text-md">
              {description}
            </p>
          )}
          {date && (
            <div className="mb-5 flex items-center gap-3">
              <Clock className="w-6 text-white" />
              <p className="text-white">{date}</p>
            </div>
          )}
          {(location || link) && (
            <div className="flex items-center gap-3">
              {location && (
                <>
                  <MapPin className="w-6 text-white" />
                  <p className="text-white">{location}</p>
                </>
              )}
              {link && (
                <>
                  <Link className="w-6 text-white" />
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-white underline underline-offset-[6px]"
                  >
                    Event Link
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
