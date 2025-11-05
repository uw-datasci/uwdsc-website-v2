import { type NextApiRequest, type NextApiResponse } from "next";
import { resend } from "@/lib/resend";
import WelcomeTemplate from "@/components/email-templates/WelcomeTemplate";
import MembershipConfirmationTemplate from "@/components/email-templates/MembershipConfirmationTemplate";
import { EmailRecipient } from "@/types/email";
import axios from "axios";

type BulkEmailRequest = {
  token: string;
  templateType: "welcome" | "confirmation" | "custom";
  recipients: EmailRecipient[];
  customSubject?: string;
  customContent?: string;
  fromName?: string;
  fromEmail?: string;
};

type EmailResult = {
  recipientId: string;
  email: string;
  status: "sent" | "failed";
  messageId?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const {
      token,
      templateType,
      recipients,
      customSubject,
      customContent,
      fromName = "UW Data Science Club",
      fromEmail = "noreply@uwdatascience.ca",
    }: BulkEmailRequest = req.body;

    // Validate required fields
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Authentication token required",
      });
    }

    if (!recipients || recipients.length === 0) {
      return res
        .status(400)
        .json({ message: "Recipients list cannot be empty" });
    }

    if (!templateType) {
      return res.status(400).json({ message: "Template type is required" });
    }

    if (templateType === "custom" && (!customSubject || !customContent)) {
      return res.status(400).json({
        message: "Custom subject and content are required for custom emails",
      });
    }

    // Send emails to all recipients
    const results: EmailResult[] = [];

    for (const recipient of recipients) {
      try {
        let emailContent;
        let subject;

        // Generate email content based on template type
        switch (templateType) {
          case "welcome":
            emailContent = WelcomeTemplate({
              username: recipient.username,
              email: recipient.email,
              faculty: recipient.faculty,
              watIAM: recipient.watIAM,
            });
            subject = `Welcome to UW Data Science Club! 🎉`;
            break;

          case "confirmation":
            emailContent = MembershipConfirmationTemplate({
              username: recipient.username,
              email: recipient.email,
              faculty: recipient.faculty,
              paymentMethod: recipient.paymentMethod,
              verifier: recipient.verifier,
              paymentLocation: recipient.paymentLocation,
              isMathSocMember: recipient.isMathSocMember,
            });
            subject = `🎉 Your UWDSC Membership is Now Active!`;
            break;

          case "custom":
            // For custom emails, you might want to create a generic template
            // or send plain HTML content
            subject = customSubject!;
            emailContent = customContent!; // This would need to be proper React component
            break;

          default:
            throw new Error(`Invalid template type: ${templateType}`);
        }

        // Send email using Resend
        const response = await resend.emails.send({
          to: recipient.email,
          from: `${fromName} <${fromEmail}>`,
          subject: subject,
          react: emailContent,
        });

        results.push({
          recipientId: recipient._id,
          email: recipient.email,
          status: "sent",
          messageId: response.id,
        });
      } catch (error) {
        console.error(`Failed to send email to ${recipient.email}:`, error);
        results.push({
          recipientId: recipient._id,
          email: recipient.email,
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    // Prepare response summary
    const summary = {
      total: recipients.length,
      sent: results.filter((r) => r.status === "sent").length,
      failed: results.filter((r) => r.status === "failed").length,
    };

    console.log(`Bulk email campaign completed:`, summary);

    res.status(200).json({
      success: true,
      message: `Bulk email campaign completed. ${summary.sent}/${summary.total} emails sent successfully.`,
      summary,
      results,
    });
  } catch (error) {
    console.error("Bulk email error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send bulk emails",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
