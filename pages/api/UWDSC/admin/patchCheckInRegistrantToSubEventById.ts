import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";
import { env } from "@/env/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { token, eventId, subEventId, userId, eventSecret } = req.body;

    const response = await axios({
      url: `${env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/admin/events/${eventId}/registrants/subevents/${subEventId}/checkin/${userId}`,
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
  } catch (e: any) {
    console.error("Error checking in user:", e);
    return res
      .status(500)
      .json({ success: false, message: e.response.data.message });
  }
}
