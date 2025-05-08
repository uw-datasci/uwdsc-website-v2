import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";
import { env as clientEnv } from "@/env/client";
import { env as serverEnv} from "@/env/server";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { token, additionalFields } = req.body;
    console.log(additionalFields);
    const response = await axios({
      url:
        clientEnv.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL +
        "/api/users/events/" +
        serverEnv.CURRENT_REGISTERED_EVENT_ID +
        "/registrants",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        additionalFields,
      }),
    });

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({ success: false });
  }
}
