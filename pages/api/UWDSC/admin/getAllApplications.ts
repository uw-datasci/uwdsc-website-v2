import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res.status(400).json({
        success: false,
        message: "Authentication token is required",
      });
    }
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/admin/applications`,
      method: "GET",
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    });
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to fetch all applications",
    });
  }
}
