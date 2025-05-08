import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";
import { env } from "@/env/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { token } = req.body;
    const response = await axios({
      url: env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL + "/api/users/user",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    res.status(200).json({
      user: response.data,
    });
  } catch (error: any) {
    console.error(error.response.data.message);

    res.status(500).json({ success: false });
  }
}
