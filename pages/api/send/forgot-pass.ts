import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require('dotenv').config()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { email } = req.body;
    
    await axios({
      url: process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL + '/api/users/forgotPass',
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        email: email
      })
    }); 

    res.status(200).json({ success: true });
  } catch (error:any) {
    let customMessage = false;
    console.error(error);

    res.status(500).json({ success: false, customErrorMessage: customMessage, error });
  }
}
