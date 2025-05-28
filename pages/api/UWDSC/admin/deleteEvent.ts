import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { token } = req.body;
    const { id } = req.query;

    if (!token) {
      console.error("No token provided");
      return res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
    }

    if (!id) {
      console.error("No event ID provided");
      return res.status(400).json({
        success: false,
        message: "Event ID is required",
      });
    }

    console.log("Deleting event with ID:", id);

    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/admin/events/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Backend response:", response.data);

    res
      .status(200)
      .json({ success: true, message: "Event deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting event:", error);
    console.error("Error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || "Failed to delete event",
      error: error.response?.data || error.message,
    });
  }
}
