import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    console.log("Request Body:", req.body);
    const { token, userId } = req.body;
    console.log("Token:", token);
    console.log("UserId:", userId);
    if (!token || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Token and userId are required" });
    }
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/admin/deleteUserById/${userId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("User deleted successfully");
      return res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    } else {
      return res
        .status(response.status)
        .json({ success: false, message: "Failed to delete user" });
    }
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
