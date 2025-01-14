import { type NextApiRequest, type NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { token, eventId, userId, eventSecret } = req.body;

  const response = await axios({
    url: `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/admin/events/${eventId}/registrants/checkin/${userId}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      eventSecret,
    }),
  });

  res.status(200).json({ updatedRegistrant: response.data });
}
