import { Mail, Instagram, Linkedin, Youtube} from "react-feather";
import { RxDiscordLogo } from "react-icons/rx";
import { RiSpotifyLine, RiTiktokLine, RiTwitterXLine } from "react-icons/ri";

import Logo from "@/components/UI/Logo";

const SOCIALS = [
  {
    icon: <Mail className="w-6 text-white" />,
    href: "mailto:contact@uwdatascience.ca",
  },
  {
    icon: <Instagram className="w-6 text-white" />,
    href: "https://www.instagram.com/uwaterloodsc/",
  },
  {
    icon: <RxDiscordLogo size={24} className="text-white" />,
    href: "https://discord.gg/VFVkyP5mgm",
  },
  {
    icon: <Linkedin className="w-6 text-white" />,
    href: "https://www.linkedin.com/company/waterloo-data-science-club/",
  },
  {
    icon: <Youtube className="w-6 text-white" />,
    href: "https://www.youtube.com/channel/UCknY88pglf2xz_S72WHIDxg",
  },
  {
    icon: <RiTwitterXLine size={24} className="text-white" />,
    href: "https://twitter.com/uwaterloodsc",
  },
  {
    icon: <RiTiktokLine size={24} className="text-white" />,
    href: "https://vm.tiktok.com/ZMF3YveUq/",
  },
  {
    icon: <RiSpotifyLine size={24} className="text-white" />,
    href: "https://open.spotify.com/show/4iWipypyDClyRHM47JIMzg",
  },
];

export default function Footer() {
  return (
    <>
      <hr className="border-b-1 border-grey3" />
      <footer className="mx-container mb-12 mt-9 flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
        <div className="flex flex-col items-center sm:items-start">
          <Logo classes="mb-4" />
          <a
            href="mailto:contact@uwdatascience.ca"
            className="font-medium text-white"
          >
            contact@uwdatascience.ca
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-5">
          {SOCIALS.map((social, i) => (
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              key={`social-${i}`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
