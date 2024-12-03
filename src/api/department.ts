import axiosClient from "./axiosClient";
import { endpoint } from "./endpoint";
const createDepartmentApi = (params: { tenPhongBan: string }) => {
  return axiosClient.post(endpoint.department.create, params);
};

const getDepartmentListApi = () => {
  return axiosClient.get(endpoint.department.list);
};
export { createDepartmentApi, getDepartmentListApi };
