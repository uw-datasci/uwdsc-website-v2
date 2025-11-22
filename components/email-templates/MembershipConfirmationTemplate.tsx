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

type MembershipConfirmationTemplateProps = {
  username: string;
  email: string;
  faculty?: string;
  paymentMethod?: string;
  verifier?: string;
  paymentLocation?: string;
  isMathSocMember?: boolean;
};

export default function MembershipConfirmationTemplate({
  username,
  email,
  faculty,
  paymentMethod,
  verifier,
  paymentLocation,
  isMathSocMember,
}: MembershipConfirmationTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>🎉 Your UWDSC Membership is Now Active!</Preview>
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

          {/* Confirmation Message */}
          <Section style={content}>
            <Heading style={h1}>🎉 Membership Confirmed!</Heading>

            <Text style={text}>
              Hi <strong>{username}</strong>,
            </Text>

            <Text style={text}>
              Congratulations! Your payment has been processed and your{" "}
              <strong>
                UW Data Science Club membership is now officially active
              </strong>
              . You&apos;re now part of our vibrant community of data science
              enthusiasts!
            </Text>

            {/* Payment Confirmation Box */}
            <Section style={confirmationBox}>
              <Text style={confirmationTitle}>✅ Payment Confirmed</Text>
              <Text style={confirmationText}>
                • <strong>Member:</strong> {username}
              </Text>
              <Text style={confirmationText}>
                • <strong>Email:</strong> {email}
              </Text>
              {faculty && (
                <Text style={confirmationText}>
                  • <strong>Faculty:</strong> {faculty}
                </Text>
              )}
              {paymentMethod && (
                <Text style={confirmationText}>
                  • <strong>Payment Method:</strong> {paymentMethod}
                </Text>
              )}
              {verifier && (
                <Text style={confirmationText}>
                  • <strong>Verified by:</strong> {verifier}
                </Text>
              )}
              {paymentLocation && (
                <Text style={confirmationText}>
                  • <strong>Payment Location:</strong> {paymentLocation}
                </Text>
              )}
              {isMathSocMember && (
                <Text style={confirmationText}>
                  • <strong>Math Society Member:</strong> Yes
                </Text>
              )}
            </Section>

            {/* Member Benefits */}
            <Text style={subheading}>🌟 Your Membership Benefits Include:</Text>

            <Text style={benefitText}>
              • <strong>Exclusive Workshop Access:</strong> Priority
              registration for technical workshops and industry talks
            </Text>

            <Text style={benefitText}>
              • <strong>Networking Opportunities:</strong> Connect with industry
              professionals and fellow data enthusiasts
            </Text>

            <Text style={benefitText}>
              • <strong>Competition Teams:</strong> Join our competitive
              programming and data science competition teams
            </Text>

            <Text style={benefitText}>
              • <strong>Career Resources:</strong> Access to resume reviews,
              interview prep, and job posting alerts
            </Text>

            <Text style={benefitText}>
              • <strong>Discord Community:</strong> 24/7 access to our
              member-only Discord server
            </Text>

            <Text style={benefitText}>
              • <strong>Project Collaboration:</strong> Opportunity to work on
              real-world data science projects
            </Text>

            {/* Next Steps */}
            <Text style={subheading}>🚀 What&apos;s Next?</Text>

            <Text style={text}>
              Now that you&apos;re an official member, here&apos;s how to make
              the most of your membership:
            </Text>

            {/* CTA Buttons */}
            <Section style={buttonContainer}>
              <Button style={button} href="https://uwdatascience.ca/memCheckIn">
                Access Member Portal
              </Button>
            </Section>

            <Section style={buttonContainer}>
              <Button
                style={secondaryButton}
                href="https://uwdatascience.ca/calendar"
              >
                View Upcoming Events
              </Button>
            </Section>

            <Text style={text}>
              1. <strong>Check in at events:</strong> Use your member portal to
              check into events and earn points
            </Text>

            <Text style={text}>
              2. <strong>Join our Discord:</strong> Connect with other members
              and stay updated on announcements
            </Text>

            <Text style={text}>
              3. <strong>Attend workshops:</strong> Start building your data
              science skills with our expert-led sessions
            </Text>

            <Text style={text}>
              4. <strong>Get involved:</strong> Consider applying for exec
              positions or volunteering at events
            </Text>

            <Hr style={hr} />

            {/* Important Notes */}
            <Section style={noteBox}>
              <Text style={noteTitle}>📌 Important Notes:</Text>
              <Text style={noteText}>
                • Keep this email as confirmation of your paid membership status
              </Text>
              <Text style={noteText}>
                • Your membership is valid for the current academic term
              </Text>
              <Text style={noteText}>
                • Bring your student ID to events for member verification
              </Text>
            </Section>

            <Hr style={hr} />

            {/* Footer */}
            <Text style={footer}>
              Welcome to the community! We&apos;re excited to see you at our
              upcoming events.
            </Text>

            <Text style={footer}>
              Questions about your membership? Contact us at{" "}
              <Link href="mailto:contact@uwdatascience.ca" style={link}>
                contact@uwdatascience.ca
              </Link>
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
  color: "#16a34a",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const subheading = {
  color: "#1f2937",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "24px 0 12px 0",
};

const text = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "16px 0",
};

const benefitText = {
  color: "#374151",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "8px 0",
};

const confirmationBox = {
  backgroundColor: "#f0f9ff",
  border: "2px solid #16a34a",
  borderRadius: "8px",
  padding: "20px",
  margin: "20px 0",
};

const confirmationTitle = {
  color: "#16a34a",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 12px 0",
};

const confirmationText = {
  color: "#1f2937",
  fontSize: "14px",
  margin: "4px 0",
};

const noteBox = {
  backgroundColor: "#fef3c7",
  border: "1px solid #f59e0b",
  borderRadius: "6px",
  padding: "16px",
  margin: "20px 0",
};

const noteTitle = {
  color: "#92400e",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0 0 8px 0",
};

const noteText = {
  color: "#92400e",
  fontSize: "14px",
  margin: "4px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "24px 0 16px 0",
};

const button = {
  backgroundColor: "#16a34a",
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
