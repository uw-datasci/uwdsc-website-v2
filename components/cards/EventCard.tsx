import Image from "next/image";
import { Clock, Link, MapPin } from "react-feather";

import { type Event } from "@/types/types";

type EventCardProps = Event & {
  startTime?: string;
  endTime?: string;
};

/**
 * A card that displays a event with a image and a title.
 * ex. cards in Past Events on home page
 */

export default function EventCard({
  title,
  description,
  image,
  date,
  location,
  link,
  startTime,
  endTime,
}: EventCardProps) {
  // Format individual times for display
  const formatTime = (timeString: string) => {
    const time = new Date(timeString);
    return time.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

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
          {(startTime || date) && (
            <div className="mb-4 mt-2 space-y-3">
              {startTime && endTime ? (
                <div className="rounded-lg bg-grey3/20 p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <Clock className="w-5 flex-shrink-0 text-white" />
                    <p className="text-sm font-medium uppercase tracking-wide text-grey1">
                      Event Schedule
                    </p>
                  </div>
                  <div className="ml-8 space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="min-w-[2.5rem] text-xs text-grey1">
                        Start:
                      </p>
                      <p className="font-medium text-white">
                        {formatTime(startTime)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="min-w-[2.5rem] text-xs text-grey1">End:</p>
                      <p className="font-medium text-white">
                        {formatTime(endTime)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Clock className="w-6 text-white" />
                  <p className="text-white">{date}</p>
                </div>
              )}
            </div>
          )}
          {endTime && !startTime && (
            <div className="mb-5 flex items-center gap-3">
              <Clock className="w-6 text-white" />
              <div className="text-white">
                <p className="text-sm text-grey1">To:</p>
                <p>{formatTime(endTime)}</p>
              </div>
            </div>
          )}
          {(location || link) && (
            <div className="rounded-lg bg-grey3/20 p-4">
              <div className="flex items-center gap-3">
                {location && (
                  <>
                    <MapPin className="w-5 flex-shrink-0 text-white" />
                    <p className="text-white">{location}</p>
                  </>
                )}
                {link && (
                  <>
                    <Link className="w-5 flex-shrink-0 text-white" />
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
