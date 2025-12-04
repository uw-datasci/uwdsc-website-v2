import { Body, Head, Html, Preview } from "@react-email/components";

type CustomEmailTemplateProps = {
  content: string;
  preview?: string;
};

export default function CustomEmailTemplate({
  content,
  preview = "Email from UW Data Science Club",
}: CustomEmailTemplateProps) {
  // Convert newlines to <br /> tags and preserve whitespace
  const contentLines = content.split("\n");

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.6",
          color: "#333",
        }}
      >
        <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          {contentLines.map((line, index) => (
            <div key={index}>{line || <br />}</div>
          ))}
        </div>
      </Body>
    </Html>
  );
}
