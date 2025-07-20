import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await axios({
      url:
        process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL +
        "/api/applications/currentTerm",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Error fetching current term:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
}
