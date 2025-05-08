import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";
import { env } from "@/env/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id, token } = req.body;
    await axios({
      url: env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL + '/api/users/verifyUser',
      method: "PATCH",
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
    console.error(error);
    res.status(500).json({ success: false, customErrorMessage: true, message: error.response.data.message });
  }
}
