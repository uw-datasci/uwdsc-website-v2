import { type NextApiRequest, type NextApiResponse } from "next";

import ContactTemplate from "@/components/email-templates/ContactTemplate";

import { resend } from "@/lib/resend";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { name, WatIAM, email, faculty, term, advert, ideas } = req.body;
    console.log(`${name} ${WatIAM} ${email} ${faculty} ${term} ${advert} ${ideas}`);
    const response = Promise<void>;
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
}
