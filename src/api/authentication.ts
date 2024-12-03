import { dataPostLoginType } from "@utils/types/auth_type";
import axiosClient from "./axiosClient";
import { endpoint } from "./endpoint";
const loginRequestApi = (params: dataPostLoginType) => {
	return axiosClient.post(endpoint.auth.login, params);
};

const refreshTokenRequestApi = (params: any) => {
	return axiosClient.post(endpoint.auth.refreshToken, params);
};

const getCustomers = (params: any) => {
	return axiosClient.get(endpoint.customers.list, params);
};
export { loginRequestApi, refreshTokenRequestApi, getCustomers };
