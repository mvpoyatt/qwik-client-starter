import { UserService } from '../gen/user_connectweb'
import {
  createConnectTransport,
  createPromiseClient,
  Interceptor,
} from "@bufbuild/connect-web";

const addAuthHeader: Interceptor = (next) => async (req) => {
  if (localStorage?.getItem("token")) {
    req.header.set("Authorization", `${window.localStorage.getItem("token")}`);
  }

  const res = await next(req);
  if (!res.stream) {
    if (res.message?.token) {
      window.localStorage.setItem("token", `${res.message.token}`);
    } else if (res.header.has("Refresh-Token")) {
      const newToken = res.header.get("Refresh-Token");
      if (newToken !== null) {
        window.localStorage.setItem("token", newToken);
      }
    }
  }
  return res;
};

const transport = createConnectTransport({
  baseUrl: "http://127.0.0.1:8080",
  interceptors: [addAuthHeader],
});

export const userService = createPromiseClient(UserService, transport);
