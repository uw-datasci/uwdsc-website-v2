import { type NextApiRequest, type NextApiResponse } from "next";
import axios, { AxiosError } from "axios";
import { env } from "@/env/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { token, eventId, userId } = req.body;

    const response = await axios({
      url: `${env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/admin/events/${eventId}/registrants/${userId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const { registrant, subEventsCheckedIn } = response.data;
    return res.status(200).json({ registrant, subEventsCheckedIn });
  } catch (e: AxiosError | any) {
    if (e.status == 404) {
      return res.status(404).json({});
    }
    return res.status(500).json({});
  }
}
