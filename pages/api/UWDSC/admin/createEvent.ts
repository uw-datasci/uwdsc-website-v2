import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { token, event, hasPaid } = req.body;

    if (!token) {
      console.error("No token provided");
      return res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
    }

    if (!event) {
      console.error("No event data provided");
      return res.status(400).json({
        success: false,
        message: "Event data is required",
      });
    }

    console.log("Creating event with data:", event);

    const newEvent = {
      ...event,
      requirements: {
        checkedIn: false,
        selected: true,
        user: { hasPaid: hasPaid },
      },
      toDisplay: {
        before: {
          user: { username: "Name", faculty: "Faculty" },
          checkedIn: "Is checked-in",
          selected: "Is selected",
        },
        after: {
          user: { username: "Name", faculty: "Faculty" },
          checkedIn: "Is checked-in",
        },
      },
    };

    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/admin/events`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(newEvent),
    });

    console.log("Backend response:", response.data);

    res.status(200).json({ success: true, event: response.data });
  } catch (error: any) {
    console.error("Error creating event:", error);
    console.error("Error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || "Failed to create event",
      error: error.response?.data || error.message,
    });
  }
}
