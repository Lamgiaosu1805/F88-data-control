import axiosClient from "./axiosClient";
import { endpoint } from "./endpoint";
const getPositionApi = () => {
  return axiosClient.get(endpoint.position.list);
};

export { getPositionApi };
