import { type NextApiRequest, type NextApiResponse } from "next";

import MailingListTemplate from "@/components/email-templates/MailingListTemplate";

import { resend } from "@/lib/resend";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { email } = req.body;
    const response = await resend.emails.send({
      to: "contact@uwdatascience.ca",
      from: "Mailing List <mailing-list@uwdatascience.ca>",
      subject: `Mailing List Form Submission`,
      react: MailingListTemplate({ email }),
    });
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
}
