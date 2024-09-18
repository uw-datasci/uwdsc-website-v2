import { type NextApiRequest, type NextApiResponse } from "next";
require('dotenv').config()
const qr = require("qrcode");
const bcrypt = require("bcryptjs");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = await bcrypt.hash(req.body.id, 10);
  const event = await bcrypt.hash(req.body.event, 10);
  const dataString = JSON.stringify({ id, event })
  const image = await qr.toDataURL(dataString)
  res.status(200).json({ success: true, dataUrl: image }); // accessToken: response.data.accessToken ???
}