import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";
import { useRouter } from "next/router";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id, token } = req.body;

    const response = await axios({
      url:
        process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL +
        "/api/admin/users/" +
        id,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const {
      _id,
      watIAM,
      username,
      email,
      password,
      userStatus,
      hasPaid,
      paymentMethod,
      verifier,
      paymentLocation,
      isEmailVerified,
    } = response.data;

    res.status(200).json({
      _id,
      watIAM,
      username,
      email,
      password,
      userStatus,
      hasPaid: hasPaid ? "True" : "False",
      paymentMethod,
      verifier,
      paymentLocation,
      isEmailVerified: isEmailVerified ? "True" : "False",
      success: true,
    });
  } catch (error: any) {
    let customMessage = false;
    console.error(error);

    res
      .status(500)
      .json({ success: false, customErrorMessage: customMessage, error });
  }
}
