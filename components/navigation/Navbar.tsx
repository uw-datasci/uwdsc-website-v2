import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '@/public/icons/logo.svg';

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

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <header className='mx-5 items-center mt-8 lg:mt-12 xs:mx-7 xl:mx-10 flex justify-between'>
      <Image src={logo} alt='logo' className='w-10 lg:w-12' />
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
    </header>
  );
}
