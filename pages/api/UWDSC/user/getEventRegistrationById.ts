import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { token } = req.body;
    const response = await axios({
      url:
        process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL +
        "/api/users/events/" +
        process.env.CURRENT_REGISTERED_EVENT_ID +
        "/registrants",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const reg = response.data.registrant;
    res.status(200).json({
      exist: true,
      status: reg.status,
      checkedIn: reg.checkedIn,
      fields: reg.additionalFields,
    });
  } catch (error: any) {
    console.error(error.response.data.message);

    res.status(500).json({ exists: false });
  }
}
