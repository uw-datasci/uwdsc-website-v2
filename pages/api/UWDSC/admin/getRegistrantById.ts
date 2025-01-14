import { type NextApiRequest, type NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { token, eventId, userId } = req.body;

    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/admin/events/${eventId}/registrants/${userId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    res.status(200).json({ registrant: response.data.registrant });
  } catch (e: AxiosError | any) {
    if (e.status == 404) {
      res.status(404).json({});
    }
  }
}
