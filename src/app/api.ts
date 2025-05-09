import {
  Api,
  Coordinates,
  LoginRequest,
  RegisterRequest,
} from "../swagger/swagger";
import { isProd } from "./utils/utils";

const fetchWithBearer: typeof fetch = async (input, init = {}) => {
  const token = localStorage.getItem("token");

  const modifiedInit: RequestInit = {
    ...init,
    headers: {
      ...(init.headers || {}),
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
  };

  try {
    const response = await fetch(input, modifiedInit);

    return response;
  } catch (error) {
    // TODO: Figure out the best way to show big errors like if the API is down
    console.log(error);
    throw {
      error: "sorry, could not connect to straysafe. please try again later!",
      success: false,
    };
  }
};

let baseUrl = process.env.NEXT_PUBLIC_API_URL;
if (isProd) {
  baseUrl = process.env.NEXT_PUBLIC_API_URL_PROD;
}

export const apiInstance = new Api({
  baseUrl: baseUrl,
  customFetch: fetchWithBearer,
});

// API Formatting:
// Controller : {
//      Action: (RequestParameters) => {
//          apiInstance.Controller.Action({RequestParameters}, {format: "json"})
//      }
// }
export const api = {
  auth: {
    login: (request: LoginRequest) =>
      apiInstance.auth.loginCreate(request, { format: "json" }),
    register: (request: RegisterRequest) =>
      apiInstance.auth.registerCreate(request, { format: "json" }),
  },
  admin: {
    allUsers: () => apiInstance.admin.usersAllList({ format: "json" }),
  },
  sighting: {
    previews: (request: Coordinates) =>
      apiInstance.sighting.previewsCreate(request, { format: "json" }),
    detailById: (request: number) =>
      apiInstance.sighting.detailDetail(request, { format: "json" }),
  },
};
