import { type NextApiRequest, type NextApiResponse } from "next";
import axios, { AxiosError } from "axios";
import { env } from "@/env/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { token, eventId, userId, checkedIn, selected, additionalFields } =
    req.body;

  const response = await axios({
    url: `${env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/admin/events/${eventId}/registrants/${userId}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      checkedIn,
      selected,
      additionalFields,
    }),
  });

  res.status(200).json({ updatedRegistrant: response.data });
}
