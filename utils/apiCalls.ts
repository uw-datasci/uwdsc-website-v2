import axios from "axios";
import store from "../store/store";

//Other
export const sendContactEmail = async (values: Record<string, string>) => {
  await axios.post("/api/other/contact", values);
};



