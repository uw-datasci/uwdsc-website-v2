import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const {token, newUser } = req.body;

    const response = await axios({
      url:
        process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL +
        "/api/admin/getAllUsers/",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,        
        "Content-Type": "application/json",
      },
    });
      
    const users = response.data.map((user: any) => ({
      _id: user._id,
      watIAM: user.watIAM,
      username: user.username,
      email: user.uwEmail,
      userStatus: user.userStatus,
      hasPaid: user.hasPaid ? "True" : "False",
      paymentMethod: user.paymentMethod ? user.paymentMethod : "",
      verifier: user.verifier ? user.verifier : "",
      paymentLocation: user.paymentLocation ? user.paymentLocation : "",
      isEmailVerified: user.isEmailVerified ? "True" : "False",
    }));

    res.status(200).json({ success: true });
  } catch (error: any) {
    let customMessage = false;

    res
      .status(error.status)
      .json({ success: false, message: error.response.data.message });
  }
}
