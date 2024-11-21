import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const {email} = req.body;
    await axios({
      url: process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL + '/api/users/sendVerification',
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        email: email
      })
    }); 
    res.status(200).json({ success: true });
  } catch (error : any) {
    console.error(error);
    res.status(500).json({ success: false, customErrorMessage: false, message: error.response.data.message });
  }
}
  