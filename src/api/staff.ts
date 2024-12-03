import axiosClient from "./axiosClient";
import { endpoint } from "./endpoint";
const createStaffApi = (params: {
  hoTen: string;
  birth: string;
  gioiTinh: 0 | 1;
  sdt: string;
  email: string;
  diaChi: string;
  cccd: string;
  ngayVaoLam: string;
  chucVu: string;
  roleId: number;
  idPhongBan: string;
}) => {
  return axiosClient.post(endpoint.staff.create, params);
};

const getStaffListApi = () => {
  return axiosClient.get(endpoint.staff.list);
};
export { createStaffApi, getStaffListApi };
