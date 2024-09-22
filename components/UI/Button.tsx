import Link from "next/link";
import Script from 'next/script'

type ButtonProps = {
  type: "button" | "submit" | "route" | "link" | "luma-button";
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

const EMBED_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://embed.lu.ma"
    : "http://127.0.0.1:333";


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
        <button type="button" onClick={disabled? ()=>{} : onClick} className={`${classes}`}>
          {children}
        </button>
      );
    case "submit":
      return (
        <button type="submit" onClick={disabled? ()=>{} : onClick} className={`${classes}`}>
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
    case "luma-button":
      return (
        <>
          <a
            href="https://lu.ma/event/evt-ChamzwlXhzTJZDS"
            className={`${classes}`}
            type="button"
            data-luma-action="checkout"
            data-luma-event-id="evt-ChamzwlXhzTJZDS"
          >
            {children}
          </a>
        
          <Script
            id="luma-checkout"
            src={`${EMBED_BASE_URL}/checkout-button.js`}
          />
        </>
          
      );
    default:
      return <></>;
  }
}
