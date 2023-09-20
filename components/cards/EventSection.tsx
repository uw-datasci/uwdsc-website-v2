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
        <div className="flex justify-center mx-28 grid gap-6 ">
            {/* title */}
            <h1 className="mb-2 text-xl font-bold text-white 3xs:text-xl sm:text-4xl lg:text-6xl 2xl:text-8xl">
                {title}
            </h1>
            {/* image */}
            <div> 
                <Image
                src={image}
                alt={title}
                className="min-w-[800px] rounded-lg "
                />
            </div>
            {/* text */}
            <div>
                <div className="flex justify-center mx-28 grid grid-cols-2 gap-6 ">
                {/* time, location, topic */}
                <div></div>
                {/* description */}
                <div></div>
                
                <div>
               
            </div>
        </div>
            </div>
        </div>
       
        
      </>
    );
  }