import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { fromDate, upToDate, buffered } = req.body;
    const response = await axios({
      url: process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL + "/api/events",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        fromDate,
        upToDate,
        buffered
      },
    });

    res.status(200).json({ events: response.data });
  } catch (error: any) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
}
