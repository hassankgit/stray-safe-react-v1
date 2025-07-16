import {
  Api,
  Coordinates,
  CreateSightingRequest,
  HttpResponse,
  LoginRequest,
  RegisterRequest,
} from "../swagger/swagger";
import { isProd } from "./utils/utils";

export type ApiError = {
  StatusCode: number;
  Message: string;
};

async function handleApiCall<T>(
  promise: Promise<HttpResponse<T, any>>
): Promise<T> {
  try {
    const res = await promise;
    if (res.ok) {
      return res.data;
    } else {
      throw res.error as ApiError;
    }
  } catch (err) {
    const error = err as ApiError;
    if (error.StatusCode == 500) {
      console.error("straysafe is down. Please try again later: ", error);
    }
    throw error;
  }
}

const fetchWithBearer: typeof fetch = async (input, init = {}) => {
  const token = localStorage.getItem("token");

  const modifiedInit: RequestInit = {
    ...init,
    headers: {
      ...(init.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
  };

  try {
    const response = await fetch(input, modifiedInit);
    if (response.status == 401) {
      handleSignOut();
    }
    return response;
  } catch {
    // TODO: Figure out the best way to show big errors like if the API is down
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

export const handleSignOut = () => {
  localStorage.clear();
  window.location.href = "/";
};

// API Formatting:
// Controller : {
//      Action: (RequestParameters) => {
//          apiInstance.Controller.Action({RequestParameters}, {format: "json"})
//      }
// }
export const api = {
  auth: {
    login: (request: LoginRequest) =>
      handleApiCall(apiInstance.auth.loginCreate(request, { format: "json" })),
    register: (request: RegisterRequest) =>
      handleApiCall(
        apiInstance.auth.registerCreate(request, { format: "json" })
      ),
  },
  admin: {
    allUsers: () =>
      handleApiCall(apiInstance.admin.usersAllList({ format: "json" })),
  },
  sighting: {
    previews: (request: Coordinates) =>
      handleApiCall(
        apiInstance.sighting.previewsCreate(request, { format: "json" })
      ),
    detailById: (request: number) =>
      handleApiCall(
        apiInstance.sighting.detailDetail(request, { format: "json" })
      ),
    upload: (file: File) =>
      handleApiCall(
        apiInstance.sighting.uploadCreate({ file: file }, { format: "json" })
      ),
    createSighting: (request: CreateSightingRequest) =>
      handleApiCall(
        apiInstance.sighting.createCreate(request, { format: "json" })
      ),
  },
};
