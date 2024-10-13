import { type NextApiRequest, type NextApiResponse } from "next";
import axios, { Axios, AxiosError } from "axios";

require('dotenv').config()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { name, WatIAM, email, password, faculty, term, advert, ideas } = req.body;
    //console.log(`${name} ${WatIAM} ${email} ${password} ${faculty} ${term} ${advert} ${ideas}`);
    
    await axios({
      url: process.env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL + '/api/users/register',
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        username: name,
        email: email.toLowerCase(),
        password: password,
        watIAM: WatIAM.toLowerCase(),
        faculty: faculty,
        term: term,
        heardFromWhere: advert,
        memberIdeas: ideas
      })
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
    res.status(200).json({ success: true });
  } catch (error:any) {
    let customMessage = false;
    console.error(error);

    if (error.response.data.message && error.response.data.message == "User already registered!") {
      error = { message: "The email you used is already a member!" };
      customMessage = true;
    }

    res.status(500).json({ success: false, customErrorMessage: customMessage, error });
  }
}
