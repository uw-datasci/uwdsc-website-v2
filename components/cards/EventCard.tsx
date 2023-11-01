import Image from "next/image";
import { FaUpRightAndDownLeftFromCenter } from 'react-icons/fa6';
import { Clock, Link, MapPin } from "react-feather";

import Button from "@/components/UI/Button";
import { type Event } from "@/types/types";

type EventCardProps = Event;

export default function EventCard({
  id,
  title,
  description,
  image,
  date,
  location,
  link,
}: EventCardProps) {

  const pageUrl = `/eventPage?id=${id}`;

  return (
    <div className="w-[300px] overflow-hidden rounded-4xl border border-grey3 md:w-[360px]">
      <div className="w-full lg:w-auto relative">
        <Image src={image} alt={title} className="aspect-[2/1] object-cover" />
        <Button
            type="route"
            href={pageUrl}
            hierarchy="secondary"
            font="font-bold"
            rounded="rounded-md"
            classes="hidden lg:block absolute text-2xl text-green-300 bottom-3 right-4 transform transition-transform hover:scale-105"
            >
            <FaUpRightAndDownLeftFromCenter style={{ fontSize: '26px' }}/>
            </Button>
      </div>
      
      
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
