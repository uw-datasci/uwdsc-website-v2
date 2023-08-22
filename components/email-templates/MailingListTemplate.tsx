import { Body, Head, Html, Preview, Text } from "@react-email/components";

type MailingListTemplateProps = {
  email: string;
};

export default function MailingListTemplate({
  email,
}: MailingListTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>New Mailing List Submission</Preview>
      <Body>
        <Text>Email: {email}</Text>
      </Body>
    </Html>
  );
}
