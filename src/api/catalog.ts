import {
  dataPostCatalog,
  dataUpdateCatalog,
  paginationType,
  searchCatalogType,
} from "@utils/types";
import axiosClient from "./axiosClient";
import { endpoint } from "./endpoint";

const createCatalogRequestApi = (params: dataPostCatalog) => {
  return axiosClient.post(endpoint.catalog.create, params);
};

const getCatalogsRequestApi = (params: paginationType) => {
  const queryString = `?limit=${params?.limit ?? 10}&page=${params?.page ?? 1}`;
  return axiosClient.get(endpoint.catalog.gets(queryString));
};

const getCatalogRequestApi = (params: string) => {
  return axiosClient.get(endpoint.catalog.get(params));
};

const updateCatalogRequestApi = (params: dataUpdateCatalog) => {
  if (!params.id) {
    throw new Error("Id is valid");
  }
  const dataPost = {
    name: params.name,
    active: params.active,
  };
  return axiosClient.patch(endpoint.catalog.get(params.id), dataPost);
};

const deleteCatalogRequestApi = (params: string) => {
  if (!params) {
    throw new Error("Id is valid");
  }
  return axiosClient.delete(endpoint.catalog.delete(params));
};

const searchCatalogsRequestApi = (params: searchCatalogType) => {
  let queryString;
  if (params?.name?.length > 0) {
    queryString = `?name=${params.name}&active=${params.active}&limit=${
      params?.limit ?? 10
    }&page=${params?.page ?? 1}`;
  } else {
    queryString = `?limit=${params?.limit ?? 10}&page=${params?.page ?? 1}`;
  }
  console.log(queryString);
  return axiosClient.get(endpoint.catalog.gets(queryString));
};

export {
  createCatalogRequestApi,
  getCatalogsRequestApi,
  getCatalogRequestApi,
  updateCatalogRequestApi,
  deleteCatalogRequestApi,
  searchCatalogsRequestApi,
};
