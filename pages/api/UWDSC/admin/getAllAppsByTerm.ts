import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const authToken = req.headers.authorization;
    const { termId } = req.query;

    if (!authToken || !termId) {
      return res.status(400).json({
        success: false,
        message: "Authentication token and termId is required",
      });
    }
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/admin/applications/byTerm/${termId}`,
      method: "GET",
      headers: {
        Authorization: authToken,
        termId: termId,
        "Content-Type": "application/json",
      },
    });
    res.status(200).json(response.data);
  } catch (error: any) {
    if (error.response?.status === 404) {
      res.status(404).json({
        error: error.response?.data?.message || "No applications found",
      });
    } else {
      res.status(500).json({
        error: "Failed to fetch term applications",
      });
    }
  }
}
