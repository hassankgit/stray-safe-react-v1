import { Api } from "../swagger/swagger";

const nodeEnv = process.env.NODE_ENV;

let baseUrl = process.env.NEXT_PUBLIC_API_URL;
if (nodeEnv == 'production') {
    baseUrl = process.env.NEXT_PUBLIC_API_URL_PROD;
}

export const apiInstance = new Api({
  baseUrl: baseUrl,
});


// API Formatting:
// Controller : {
//      Action: (RequestParameters) => {
//          apiInstance.Controller.Action({RequestParameters}, {format: "json"})     
//      }
// }
export const api = {
  user: {
    login: (username?: string | null, password?: string | null) =>
      apiInstance.user.loginCreate({ username, password }, { format: "json" }),
  },
  admin: {
    allUsers: () => apiInstance.admin.allUsersList({ format: "json" }),
  },
};
