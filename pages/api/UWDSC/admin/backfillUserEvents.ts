import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { token, userId } = req.body;
    if (!token || !userId) {
      return res.status(400).json({
        success: false,
        message: "Token and userId are required",
      });
    }

    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/users/backfillAll/${userId}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return res.status(200).json({ 
        success: true, 
        message: response.data.message,
        eventsRegistered: response.data.eventsRegistered,
        events: response.data.events
      });
    } else {
      return res.status(response.status).json({ success: false, message: "Failed to backfill user events" });
    }
  } catch (error: any) {
    console.error("Error backfilling user events:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
} 