import { Calendar, MapPin } from "lucide-react";

interface eventSnippetProps {
  name: string;
  date: string;
  location: string;
  stampSvgUrl?: string;
}

export default function EventSnippet(props: eventSnippetProps) {
  return (
    // event name, date, and location info on snippet
    <div className="relative flex flex-col gap-2 rounded-lg bg-[#BACCFF4D]/30 px-5 py-3 text-white">
      {props.stampSvgUrl && (
        <img src={props.stampSvgUrl} className="absolute right-0 top-0" />
      )}
      <p className="z-10 text-lg font-medium">{props.name}</p>
      <div className="text-base flex flex-row gap-5 font-light">
        <div className="flex flex-row items-center gap-2">
          <Calendar className="h-5 w-5" strokeWidth={1.75} />
          <p className="text-[0.9rem]">{props.date}</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <MapPin className="h-5 w-5" strokeWidth={1.75} />
          <p className="text-[0.9rem]">{props.location}</p>
        </div>
      </div>
    </div>
  );
}
