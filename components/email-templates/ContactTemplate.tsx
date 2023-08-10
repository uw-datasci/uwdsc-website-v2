import { Body, Head, Html, Preview, Text } from '@react-email/components';

type ContactTemplateProps = {
  name: string;
  email: string;
  purpose: string;
  message: string;
};

export default function ContactTemplate({
  name,
  email,
  purpose,
  message,
}: ContactTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission From: {name}</Preview>
      <Body>
        <Text>Name: {name}</Text>
        <Text>Email: {email}</Text>
        <Text>Purpose of Contact: {purpose}</Text>
        <Text>Message: {message}</Text>
      </Body>
    </Html>
  );
}
