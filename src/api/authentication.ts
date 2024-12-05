import { dataPostLoginType } from "@utils/types/auth_type";
import axiosClient from "./axiosClient";
import { endpoint } from "./endpoint";
import { DataForDate } from "@utils/types";
const loginRequestApi = (params: dataPostLoginType) => {
	return axiosClient.post(endpoint.auth.login, params);
};

const refreshTokenRequestApi = (params: any) => {
	return axiosClient.post(endpoint.auth.refreshToken, params);
};

const getNumberOfDataForDate = (): Promise<{ status: boolean; result: DataForDate[] }> => {
	return axiosClient.get(endpoint.f88.getAll);
};

const listDataForDate = (date: string): Promise<{ status: boolean; result: any }> => {
	return axiosClient.get(endpoint.f88.listDate(date));
};

const getCustomerDetail = (id: string): Promise<{ status: boolean; result: any }> => {
	return axiosClient.get(endpoint.customer.detail(id));
};

const updateStatus = (payload: any): Promise<{ status: boolean; result: any }> => {
	return axiosClient.post(endpoint.f88.updateStatus, payload);
};
export {
	loginRequestApi,
	refreshTokenRequestApi,
	getNumberOfDataForDate,
	listDataForDate,
	getCustomerDetail,
	updateStatus,
};
