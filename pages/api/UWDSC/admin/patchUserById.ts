import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { token, userId, newUser } = req.body;
    if (!token || !userId || !newUser) {
      return res.status(400).json({
        success: false,
        message: "Token, userId, and newUser are required",
      });
    }

    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/admin/users/${userId}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        email: newUser.email,
        username: newUser.username,
        password: newUser.password,
        userStatus: newUser.userStatus,
        isEmailVerified: newUser.isEmailVerified === "True",
        hasPaid: newUser.hasPaid === "True",
        paymentMethod: newUser.paymentMethod,
        verifier: newUser.verifier,
        paymentLocation: newUser.paymentLocation,
      },
    });

    if (response.status === 200) {
      return res
        .status(200)
        .json({ success: true, message: "User edited successfully" });
    } else {
      return res
        .status(response.status)
        .json({ success: false, message: "Failed to edit user" });
    }
  } catch (error: any) {
    console.error("Error editing user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
