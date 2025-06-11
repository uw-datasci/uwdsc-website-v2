import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { eventId } = req.query;
    if (!eventId) {
      console.log("No event Id provided");
    }
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/events/${eventId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: "No event found" });
    } else {
      res.status(500).json({
        error: error.response?.data?.message || "Failed to fetch event",
      });
    }
  }
}
