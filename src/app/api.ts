import { Api } from "../swagger/swagger";

export const apiInstance = new Api({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
})

export const api = {
    user: {
      login: (username?: string | null, password?: string | null) =>
        apiInstance.user.loginCreate({ username, password }, { format: "json" }),
    },
    admin: {
        allUsers: () => apiInstance.admin.allUsersList({ format: "json" }),
    },
};