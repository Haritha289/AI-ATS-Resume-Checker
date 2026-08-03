import { apiClient } from "./client";

export const authApi = {
  register: (payload) =>
    apiClient.post("/auth/register", payload).then((r) => {
      const data = r.data;

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      return data;
    }),

  login: (payload) =>
    apiClient.post("/auth/login", payload).then((r) => {
      const data = r.data;

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      return data;
    }),

  logout: () =>
    apiClient.post("/auth/logout").then((r) => {
      localStorage.removeItem("token");
      return r.data;
    }),

  me: () => apiClient.get("/auth/me").then((r) => r.data),

  updateProfile: (payload) =>
    apiClient.patch("/auth/profile", payload).then((r) => r.data),

  changePassword: (payload) =>
    apiClient.patch("/auth/password", payload).then((r) => r.data),
};