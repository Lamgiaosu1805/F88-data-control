
import { dataPostLoginType } from "@utils/types/auth_type";
import axiosClient from "./axiosClient";
import { endpoint } from "./endpoint";
const loginRequestApi = (params: dataPostLoginType) => {
  return axiosClient.post(endpoint.auth.login, params);
};

const refreshTokenRequestApi = (params: any) => {
  return axiosClient.post(endpoint.auth.refreshToken, params);
};
export { loginRequestApi, refreshTokenRequestApi };
