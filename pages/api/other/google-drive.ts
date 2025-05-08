import { type NextApiRequest, type NextApiResponse } from "next";
import { google } from "googleapis";
import { env } from "@/env/server"; 

const oauth2Client = new google.auth.OAuth2(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground",
);
oauth2Client.setCredentials({
  refresh_token: env.GOOGLE_CLIENT_REFRESH_TOKEN,
});

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { fileId: rawFileId } = req.query;
    const fileId = Array.isArray(rawFileId) ? rawFileId[0] : rawFileId;

    const response = await drive.files.get({
      fileId: fileId,
    });

    // Return data to the client
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
