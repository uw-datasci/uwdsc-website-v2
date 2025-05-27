import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { token, ...eventData } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required",
      });
    }

    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/admin/events`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: eventData,
    });

    if (response.status === 201) {
      return res.status(201).json({
        success: true,
        message: response.data.message,
        eventId: response.data.eventId,
      });
    } else {
      return res.status(response.status).json({ success: false, message: "Failed to create event" });
    }
  } catch (error: any) {
    console.error("Error creating event:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
} 