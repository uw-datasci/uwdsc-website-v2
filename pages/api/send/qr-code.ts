import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";
require('dotenv').config()
const qr = require("qrcode");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const dataString = JSON.stringify(req.body)
  const image = await qr.toDataURL(dataString)
  res.status(200).json({ success: true, dataUrl: image }); // accessToken: response.data.accessToken ???
}