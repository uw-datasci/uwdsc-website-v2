import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";
import { env as clientEnv } from "@/env/client";
import { env as serverEnv } from "@/env/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { token } = req.body;
    const response = await axios({
      url:
        clientEnv.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL +
        "/api/users/events/" +
        serverEnv.CURRENT_REGISTERED_EVENT_ID +
        "/registrants",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    res.status(200).json({
      exist: true,
      status: response.data.registrant.status,
      fields: response.data.registrant.additionalFields,
    });
  } catch (error: any) {
    console.error(error.response.data.message);

    res.status(500).json({ exists: false });
  }
}
