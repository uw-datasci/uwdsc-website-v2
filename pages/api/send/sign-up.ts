import { type NextApiRequest, type NextApiResponse } from "next";
import { store } from "@/store/store";
import { login } from "@/store/slices/loginTokenSlice";
import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYWRtaW4xIiwiZW1haWwiOiJhZG1pbjFAZ21haWwuY29tIiwiaWQiOiI2Njc3MGVjY2IyYjNkNzg0MDAyZGI5YWYiLCJ1c2VyU3RhdHVzIjoiYWRtaW4ifSwiaWF0IjoxNzIwODc5NDU1LCJleHAiOjE3MjExMzg2NTV9.Xip1P9r4BHhiNY7rQIisgPT2qQONBp8-Bp-IbXYXBSk"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { name, WatIAM, email, faculty, term, advert, ideas } = req.body;
    console.log(`${name} ${WatIAM} ${email} ${faculty} ${term} ${advert} ${ideas}`);
    const response = Promise<void>;
    /*const response = await axios({
      url: 'http://localhost:5001/api/user/login',
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        email: "member1@gmail.com",
        password: "$2b$10$4651Q.T8cjq4E6En6rwRk.F/h7IihVJEZOoYWg.nU10gogs7nLCX6",
      })
    });

    console.log(response);*/
    
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
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
}
