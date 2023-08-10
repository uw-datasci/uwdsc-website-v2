import GradientBorder from "./GradientBorder";

type ChipProps = {
  icon: React.ReactNode;
  href: string;
  children: React.ReactNode;
};

export default function Chip({ icon, href, children }: ChipProps) {
  return (
    <GradientBorder rounded="rounded-full">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 rounded-full bg-black py-3 pl-4 pr-5"
      >
        {icon}
        <p className="font-semibold text-white">{children}</p>
      </a>
    </GradientBorder>
  );
}
