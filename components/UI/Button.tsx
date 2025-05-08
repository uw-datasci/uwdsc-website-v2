import Link from "next/link";
import Script from "next/script";

type ButtonProps = {
  type: "button" | "submit" | "route" | "link";
  href?: string;
  onClick?: () => void;
  hierarchy: "primary" | "secondary";
  text?: string;
  font?: string;
  border?: string;
  rounded?: string;
  padding?: string;
  classes?: string;
  children: React.ReactNode;
  disabled?: boolean; // Add this line
};

export default function Button({
  type,
  href,
  onClick,
  hierarchy,
  text,
  font,
  border,
  rounded,
  padding = "py-3 px-5",
  classes,
  children,
  disabled, // Add this line
}: ButtonProps) {
  switch (hierarchy) {
    case "primary":
      classes = `text-white inline-block text-center bg-gradient ${text} ${font} ${border} ${rounded} ${padding} ${classes}`;
      break;
    case "secondary":
      classes = `text-white inline-block text-center bg-black ${text} ${font} ${border} ${padding} ${rounded} ${classes}`;
      break;
  }

  switch (type) {
    case "button":
      return (
        <button
          type="button"
          onClick={disabled ? () => {} : onClick}
          className={`${classes}`}
        >
          {children}
        </button>
      );
    case "submit":
      return (
        <button
          type="submit"
          onClick={disabled ? () => {} : onClick}
          className={`${classes}`}
        >
          {children}
        </button>
      );
    case "route":
      return (
        <Link href={href as string} className={`${classes}`}>
          {children}
        </Link>
      );
    case "link":
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={`${classes}`}
        >
          {children}
        </a>
      );
    default:
      return <></>;
  }
}
