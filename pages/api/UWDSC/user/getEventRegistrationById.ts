import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { token } = req.body;

    // First get the latest event
    const latestEventResponse = await axios({
      url: `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/events/latest`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    //console.log(latestEventResponse.data);
    const latestEvent = latestEventResponse.data._id;
    console.log(latestEvent);
    // if (!latestEvent) {
    //   return res.status(404).json({ exists: false, message: "No upcoming events found" });
    // }

    // Then get the registration status for that event


    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/api/users/events/${latestEvent}/registrants`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("bruh");
    console.log(response.data);
    const reg = response.data.registrant;
    res.status(200).json({
      exist: true,
      status: reg.status,
      checkedIn: reg.checkedIn,
      fields: reg.additionalFields,
    });
  } catch (error: any) {
    console.error(error.response?.data?.message || "Error fetching registration status");

    if (error.response?.status === 404) {
      res.status(404).json({ exists: false, message: "No registration found" });
    } else {
      res.status(500).json({ exists: false, message: "Failed to fetch registration status" });
    }
  }
}
