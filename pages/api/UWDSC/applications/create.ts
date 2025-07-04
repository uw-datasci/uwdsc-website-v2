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
        "/api/applications/submit",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.body.token}`,
      },
      data: req.body,
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Error creating application:", error);
    res.status(error.response?.status || 500).json({
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Internal Server Error",
    });
  }
}
