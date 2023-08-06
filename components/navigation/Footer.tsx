import { Mail, Instagram, Linkedin, Youtube, Twitter } from 'react-feather';
import { RxDiscordLogo } from 'react-icons/rx';
import { RiSpotifyLine, RiTiktokLine } from 'react-icons/ri';

import Logo from '@/components/UI/Logo';

const SOCIALS = [
  {
    icon: <Mail className='w-6 text-white' />,
    href: 'mailto:contact@uwdatascience.ca',
  },
  {
    icon: <Instagram className='w-6 text-white' />,
    href: 'https://www.instagram.com/uwaterloodsc/',
  },
  {
    icon: <RxDiscordLogo size={24} className='text-white' />,
    href: 'https://discord.gg/2Y5W2z6',
  },
  {
    icon: <Linkedin className='w-6 text-white' />,
    href: 'https://www.linkedin.com/company/waterloo-data-science-club/',
  },
  {
    icon: <Youtube className='w-6 text-white' />,
    href: 'https://www.youtube.com/channel/UCknY88pglf2xz_S72WHIDxg',
  },
  {
    icon: <Twitter className='w-6 text-white' />,
    href: 'https://twitter.com/uwaterloodsc',
  },
  {
    icon: <RiTiktokLine size={24} className='text-white' />,
    href: 'https://vm.tiktok.com/ZMF3YveUq/',
  },
  {
    icon: <RiSpotifyLine size={24} className='text-white' />,
    href: 'https://open.spotify.com/show/4r1GMei94NFMEMTi6ErvEk?si=3b8fa1ef88334caa',
  },
];

export default function Footer() {
  return (
    <>
      <hr className='border-b-1 border-grey3' />
      <footer className='mx-container mt-9 mb-12 flex flex-col sm:flex-row justify-between sm:items-center gap-8'>
        <div className='flex items-center flex-col sm:items-start'>
          <Logo classes='mb-4' />
          <a
            href='mailto:contact@uwdatascience.ca'
            className='text-white font-medium'
          >
            contact@uwdatascience.ca
          </a>
        </div>
        <div className='flex gap-5 flex-wrap justify-center'>
          {SOCIALS.map((social, i) => (
            <a
              href={social.href}
              target='_blank'
              rel='noopener noreferrer'
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
