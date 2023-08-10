import Image from "next/image";
import Link from "next/link";

import dsc from "@/public/logos/dsc.svg";

type LogoProps = {
  classes?: string;
};

export default function Logo({ classes }: LogoProps) {
  return (
    <Link href="/" className={`block ${classes}`}>
      <Image src={dsc} alt="logo" className="w-10 lg:w-12" />
    </Link>
  );
}
