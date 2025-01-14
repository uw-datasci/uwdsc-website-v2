import Image from "next/image";
import Link from "next/link";

import dsc from "@/public/logos/dsc.svg";

type LogoProps = {
  classes?: string;
};

export default function Logo({ classes }: LogoProps) {
  return (
    <Link href="/" className={`block w-11.5 lg:w-13.5 ${classes}`}>
      <Image src={dsc} alt="logo" className="w-full" />
    </Link>
  );
}
