import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { token, newUser } = req.body;

    const response = await axios({
      url:
        process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL +
        "/api/admin/createUser",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        username: newUser.username,
        watIAM: newUser.watIAM,
        email: newUser.email,
        password: newUser.password,
        term: "1A",
        faculty: "Math",
        heardFromWhere: "Placeholder",
        userStatus: newUser.userStatus,
        memberIdeas: "",
        hasPaid: newUser.hasPaid,
        paymentMethod: newUser.paymentMethod,
        verifier: newUser.verifier,
        paymentLocation: newUser.paymentLocation,
        isEmailVerified: newUser.isEmailVerified,
      }),
    });

    const responseData = await response.data();
    return res.status(200).json({ success: true, message: "User created" });
  } catch (error: any) {
    console.log("Error creating user:", error);
    res.status(500).json({ success: false, error });
  }
}
