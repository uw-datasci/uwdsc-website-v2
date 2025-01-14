import { type NextApiRequest, type NextApiResponse } from "next";
import axios from "axios";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { email, password } = req.body;
    const response = await axios({
      url:
        process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL + "/api/users/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email: email.toLowerCase(),
        password: password,
      }),
    });

    /*
    To use state anywhere in the app,
      1. Import useSelector and rootState
      2. Initalize your hook like so :
        const token = useSelector((state: RootState) => state.loginToken.value);

    To login/logout,
      1. Import useDispatch and login/logou(From the store slice)
      2. Initialize dispatch like so :
        const dispatch = useDispatch();
      3. Use either login/logout
        dispatch(login("AUTH TOKEN"));
        or
        dispatch(logout());
      **When logged out, the redux state would just be an empty string**
    */
    res.status(200).json({
      success: true,
      accessToken: response.data.accessToken,
      name: response.data.name,
      role: response.data.role,
    });
  } catch (error: any) {
    let customMessage = false;
    console.error(error.response.data.message);

    if (
      error.response.data.message ==
      "The email for this account has not been verified."
    ) {
      error = { message: error.response.data.message };
      customMessage = true;
    }

    res
      .status(500)
      .json({ success: false, customErrorMessage: customMessage, error });
  }
}
