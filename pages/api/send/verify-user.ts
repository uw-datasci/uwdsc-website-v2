import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require('dotenv').config()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id, token } = req.body;
    
    await axios({
      url: process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL + '/api/users/verifyUser',
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        id: id,
        token: token
      })
    }); 

    res.status(200).json({ success: true });
  } catch (error:any) {
    let customMessage = false;
    console.error(error);

    res.status(500).json({ success: false, customErrorMessage: customMessage, error });
  }
}
