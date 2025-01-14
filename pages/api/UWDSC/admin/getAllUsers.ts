import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { token } = req.body;
    const response = await axios({
      url:
        process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL +
        "/api/admin/users",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    const users = data.map((user: any) => ({
      _id: user._id,
      watIAM: user.watIAM,
      username: user.username,
      email: user.email,
      password: "********", // Password is default set to "********" while querying
      userStatus: user.userStatus,
      hasPaid: user.hasPaid ? "True" : "False", // TODO: maybe change to Paid/Unpaid but that would cause filtering issues
      paymentMethod: user.paymentMethod || "",
      verifier: user.verifier || "",
      paymentLocation: user.paymentLocation || "",
      isEmailVerified: user.isEmailVerified ? "True" : "False",  // TODO: maybe change to Verified/Unverified but that would cause filtering issues
    }));

    res.status(200).json({ success: true, users });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
}
