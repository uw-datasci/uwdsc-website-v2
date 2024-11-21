import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id, token, eventName } = req.body;

    await axios({
      url:
        process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL +
        "/api/admin/users/checkIn/" +
        id,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({
        eventName,
      }),
    });

    res.status(200).json({ success: true });
  } catch (error: any) {
    let customMessage = false;

    res
      .status(error.status)
      .json({ success: false, message: error.response.data.message });
  }
}
