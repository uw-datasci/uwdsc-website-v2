import { type NextApiRequest, type NextApiResponse } from "next";
import { store } from "@/store/store";
import { login } from "@/store/slices/loginTokenSlice";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { name, WatIAM, email, faculty, term, advert, ideas } = req.body;
    console.log(`${name} ${WatIAM} ${email} ${faculty} ${term} ${advert} ${ideas}`);
    const response = Promise<void>;
    store.dispatch(login("TOKEN GOES HERE"));
    console.log(store.getState().loginToken.value);
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
