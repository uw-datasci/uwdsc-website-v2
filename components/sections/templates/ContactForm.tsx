import { Mail, Instagram } from "react-feather";
import { RxDiscordLogo } from "react-icons/rx";

import Chip from "@/components/UI/Chip";

const CHIPS = [
  {
    label: "contact@uwdatascience.ca",
    href: "mailto:contact@uwdatascience.ca",
    icon: <Mail className="w-5 text-white" />,
  },
  {
    label: "@uwaterloodsc",
    href: "https://www.instagram.com/uwaterloodsc/",
    icon: <Instagram className="w-5 text-white" />,
  },
  {
    label: "discord.gg/VFVkyP5mgm",
    href: "https://discord.gg/VFVkyP5mgm",
    icon: <RxDiscordLogo size={24} className="text-white" />,
  },
];

type ContactProps = {
  title: string;
  id: string;
  includeSideInfo: boolean;
  description: React.ReactNode;
  formClasses?: string;
};

export default function ContactForm({
  title,
  id,
  includeSideInfo,
  description,
  formClasses,
}: ContactProps) {
  return (
    <section
      id={id}
      className={
        formClasses
          ? formClasses
          : "mb-section mx-container grid gap-10 lg:grid-cols-2 lg:gap-16"
      }
    >
      {includeSideInfo && (
        <>
          <div>
            <h2 className="mb-3 text-4xl font-bold text-white md:text-8xl lg:-mt-3 xl:text-8xl">
              {title}
            </h2>
            <p className="leading-loose text-white md:text-lg lg:mb-12 lg:text-md xl:text-lg">
              {description}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-4">
            {CHIPS.map((chip, i) => (
              <div
                key={`chip-${i}`}
                className="w-40 text-sm px-3 py-1"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Chip icon={chip.icon} href={chip.href}>
                  {chip.label}
                </Chip>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
