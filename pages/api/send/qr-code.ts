import { type NextApiRequest, type NextApiResponse } from "next";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "@/store/store";
import axios from "axios";

require('dotenv').config()

const token = useSelector((state: RootState) => state.loginToken.token);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const {whatever_info_you_need} = req.body; //Info passed from moment of request
    const response = await axios({
      url: process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL + '/api/users/', //Add your API endpoint here (should be under users)
      method: "POST",
      headers: {
        "Content-Type": "application/json" //Might want to change for .png
      },
      // If you need to pass body data
      //data:
    }); 

    res.status(200).json({ success: true, accessToken: response.data.accessToken });
  } catch (error:any) {
    console.error(error.response.data.message);

    res.status(500).json({ success: false });
  }
}