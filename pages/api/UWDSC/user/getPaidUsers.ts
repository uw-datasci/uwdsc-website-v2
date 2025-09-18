import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/users/paidMembers`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (err: any) {
    console.error("Error fetching paid users:", err);
    res.status(500).json({
      success: false,
      message: err.response?.data?.message || "Failed to fetch paid users",
    });
  }
}
