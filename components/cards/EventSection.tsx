import { type Event } from '@/types/types';
import Image from "next/image";

type EventSectionProps = Event;

export default function EventSection({
  title,
  description,
  image,
  date,
  location,
  link,
}: EventSectionProps) {
  return (
    <>
      <div className="flex justify-center text-white mx-3028 grid gap-6 ">
        {/* title */}
        <h1 className="mb-2 text-xl font-bold 3xs:text-xl sm:text-4xl lg:text-6xl 2xl:text-8xl">
          {title}
        </h1>
        {/* image */}
        <div className="w-full lg:w-auto">
          <Image
            src={image}
            alt={title}
            className="w-full lg:max-w-[800px] h-auto rounded-lg"
          />
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Column (Time, Location, Topics) */}
          <div className="lg:w-1/3">
            <div className="mb-4">
              <span className="font-bold">Time:</span> <br /> {date}
            </div>
            <div className="mb-4">
              <span className="font-bold">Location:</span> <br /> {location}
            </div>
            <div className="mb-4">
              <span className="font-bold">Topics:</span> <br /> {link}
            </div>
          </div>

          {/* Right Column (Description) */}
          <div className="lg:w-2/3">
            <div className="mb-4">
               {description}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
