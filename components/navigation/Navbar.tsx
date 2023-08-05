import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Linkedin, Mail, Youtube } from 'react-feather';

import Button from '@/components/UI/Button';
import GradientBorder from '@/components/UI/GradientBorder';

import dsc from '@/public/logos/dsc.svg';

const ROUTES = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'CXC',
    href: '/cxc',
  },
  {
    label: 'Team',
    href: '/team',
  },
  {
    label: 'Contact',
    href: '/#contact',
  },
];

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
    icon: <Linkedin className='w-6 text-white' />,
    href: 'https://www.linkedin.com/company/waterloo-data-science-club/',
  },
  {
    icon: <Youtube className='w-6 text-white' />,
    href: 'https://www.youtube.com/channel/UCknY88pglf2xz_S72WHIDxg',
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header className='mx-nav z-50 items-center relative mt-8 lg:mt-12 flex justify-between'>
        <Image src={dsc} alt='logo' className='w-10 lg:w-12' />
        <nav className='lg:flex gap-16 hidden'>
          {ROUTES.map(({ label, href }) => (
            <Link href={href} className='text-white font-semibold' key={label}>
              {label}
            </Link>
          ))}
        </nav>
        <button
          type='button'
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className='flex flex-col gap-[5px] lg:hidden'
        >
          <div
            className={`transition-300 w-[22px] bg-white h-[5px] rounded-full ${
              isMobileMenuOpen ? 'translate-x-[10px]' : ''
            }`}
          />
          <div className='w-8 bg-white h-[5px] rounded-full' />
          <div
            className={`transition-300 w-[22px] bg-white h-[5px] rounded-full ${
              isMobileMenuOpen ? '' : 'translate-x-[10px]'
            }`}
          />
        </button>
        <Button
          type='link'
          href=''
          hierarchy='primary'
          font='font-bold'
          rounded='rounded-md'
          classes='hidden lg:block'
        >
          Join Us
        </Button>
      </header>
      <div
        className={`transition-300 bg-black fixed inset-0 lg:hidden ${
          isMobileMenuOpen ? '' : 'translate-x-full'
        }`}
      >
        <div className='absolute inset-0 bg-gradient opacity-10 pointer-events-none' />
        <nav className='mt-36 grid gap-8 mx-container'>
          {ROUTES.map(({ label, href }) => (
            <Link
              href={href}
              className='text-white font-bold text-5xl'
              key={label}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className='absolute flex bottom-12 inset-x-0 justify-center gap-4'>
          {SOCIALS.map(({ icon, href }, i) => (
            <a
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              key={`social-${i}`}
            >
              <GradientBorder rounded='rounded-sm'>
                <div className='bg-black rounded-[7px] p-2.5'>{icon}</div>
              </GradientBorder>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
