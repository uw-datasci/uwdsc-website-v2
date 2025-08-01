import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const { token, ...applicationData } = req.body;
    const response = await axios({
      url:
        process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL +
        "/api/applications/save",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: applicationData,
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Error updating application:", error);
    res.status(error.response?.status || 500).json({
      success: false,
      error:
        // error.response?.data?.message ||
        // error.message ||
        "Internal Server Error: please try again later or contact us",
    });
  }
}
