import { type NextApiRequest, type NextApiResponse } from "next";

import ContactTemplate from "@/components/email-templates/ContactTemplate";

import { resend } from "@/lib/resend";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { name, email, purpose, message } = req.body;
    const response = await resend.emails.send({
      to: "contact@uwdatascience.ca",
      from: "General Contact Form <website@uwdatascience.ca>",
      subject: `General Contact Form Submission from ${name}`,
      react: ContactTemplate({ name, email, purpose, message }),
    });
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
}
