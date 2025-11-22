import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type WelcomeTemplateProps = {
  username: string;
  email: string;
  faculty?: string;
  watIAM?: string;
};

export default function WelcomeTemplate({
  username,
  email,
  faculty,
  watIAM,
}: WelcomeTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to UW Data Science Club! 🎉</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={logoSection}>
            <Img
              src="https://uwdatascience.ca/logos/logo-dark.png"
              width="200"
              height="auto"
              alt="UW Data Science Club"
              style={logo}
            />
          </Section>

          {/* Welcome Message */}
          <Section style={content}>
            <Heading style={h1}>Welcome to UW Data Science Club! 🎉</Heading>

            <Text style={text}>
              Hi <strong>{username}</strong>,
            </Text>

            <Text style={text}>
              Welcome to the University of Waterloo Data Science Club!
              We&apos;re thrilled to have you join our community of data
              enthusiasts, aspiring data scientists, and industry professionals.
            </Text>

            {/* Personalized Info */}
            <Section style={infoBox}>
              <Text style={infoTitle}>Your Membership Details:</Text>
              <Text style={infoText}>
                • <strong>Name:</strong> {username}
              </Text>
              <Text style={infoText}>
                • <strong>Email:</strong> {email}
              </Text>
              {faculty && (
                <Text style={infoText}>
                  • <strong>Faculty:</strong> {faculty}
                </Text>
              )}
              {watIAM && (
                <Text style={infoText}>
                  • <strong>WatIAM:</strong> {watIAM}
                </Text>
              )}
            </Section>

            {/* What's Next Section */}
            <Text style={text}>
              <strong>What&apos;s next?</strong>
            </Text>

            <Text style={text}>
              • 📅 <strong>Check out our events:</strong> Visit our calendar to
              see upcoming workshops, networking events, and competitions
            </Text>

            <Text style={text}>
              • 💼 <strong>Join our community:</strong> Connect with fellow
              members on our Discord server
            </Text>

            <Text style={text}>
              • 🚀 <strong>Get involved:</strong> Apply for exec positions and
              help shape the future of our club
            </Text>

            <Text style={text}>
              • 📚 <strong>Access resources:</strong> Explore our curated
              learning materials and industry resources
            </Text>

            {/* CTA Buttons */}
            <Section style={buttonContainer}>
              <Button style={button} href="https://uwdatascience.ca/calendar">
                View Events Calendar
              </Button>
            </Section>

            <Section style={buttonContainer}>
              <Button
                style={secondaryButton}
                href="https://uwdatascience.ca/team"
              >
                Meet the Team
              </Button>
            </Section>

            <Hr style={hr} />

            {/* Footer */}
            <Text style={footer}>
              Questions? Feel free to reach out to us at{" "}
              <Link href="mailto:contact@uwdatascience.ca" style={link}>
                contact@uwdatascience.ca
              </Link>
            </Text>

            <Text style={footer}>
              Follow us on social media and stay connected!
            </Text>

            <Text style={footer}>
              Best regards,
              <br />
              <strong>UW Data Science Club Team</strong>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  borderRadius: "8px",
  margin: "40px auto",
  padding: "20px",
  width: "600px",
};

const logoSection = {
  textAlign: "center" as const,
  padding: "20px 0",
};

const logo = {
  margin: "0 auto",
};

const content = {
  padding: "0 20px",
};

const h1 = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const text = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "16px 0",
};

const infoBox = {
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "6px",
  padding: "20px",
  margin: "20px 0",
};

const infoTitle = {
  color: "#1f2937",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0 0 12px 0",
};

const infoText = {
  color: "#4b5563",
  fontSize: "14px",
  margin: "4px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0 16px 0",
};

const button = {
  backgroundColor: "#3b82f6",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  border: "none",
};

const secondaryButton = {
  backgroundColor: "#6b7280",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  border: "none",
};

const hr = {
  borderColor: "#e2e8f0",
  margin: "30px 0",
};

const footer = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "1.5",
  textAlign: "center" as const,
  margin: "8px 0",
};

const link = {
  color: "#3b82f6",
  textDecoration: "underline",
};
