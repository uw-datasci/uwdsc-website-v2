import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/events/latest`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Error fetching latest event:", error);
    if (error.response?.status === 404) {
      res.status(404).json({ error: "No upcoming events found" });
    } else {
      res.status(500).json({ error: error.response?.data?.message || "Failed to fetch latest event" });
    }
  }
} 