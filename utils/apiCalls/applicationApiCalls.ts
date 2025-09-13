import axios from "axios";
import store from "../../store/store";

//Application
export const getCurrentTerm = async () => {
  return await axios.get("/api/UWDSC/applications/currentTerm");
};

export const createOrUpdateApplication = async (
  applicationData: Record<string, any>,
) => {
  return await axios.post("/api/UWDSC/applications/save", {
    token: store.getState().loginToken.token,
    ...applicationData,
  });
};

export const getCurrentUserApplication = async () => {
  return await axios.post("/api/UWDSC/applications/user", {
    token: store.getState().loginToken.token,
  });
};