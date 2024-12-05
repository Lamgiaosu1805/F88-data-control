import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { store } from "@store/index";

const axiosClient = axios.create({
	// baseURL: "http://42.113.122.118:2003/api/v1/",
	baseURL: "https://chovaynganghang.com.vn/landing-page/api/v1",
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Allow-Methods": "*",
	},
	timeout: 20000,
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
	const token = store.getState().authentication.user?.accessToken;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosClient.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response?.status === 401) {
			console.log("authorization 401");
		}
		return Promise.resolve(response.data);
	},
	(error) => {
		throw error?.response?.data;
	}
);
export default axiosClient;
