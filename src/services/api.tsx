import axios, { AxiosRequestConfig, ResponseType } from "axios";

type IRequest = {
  endpoint: string;
  method: AxiosRequestConfig["method"];
  token: string | null;
  data?: any ;
  responseType: ResponseType
};

export function apiRequest({
  token,
  data,
  method,
  endpoint,
  responseType
  
}: IRequest): Promise<any> {

  const config: AxiosRequestConfig = {
    method,
    url: `${import.meta.env.VITE_BASE_URL}${endpoint}`,
    headers: {
      'Accept' : 'application/json',
      "Content-Type": "application/json",
    },
    responseType
  };

  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  if (data) {
    config.data = JSON.stringify(data);
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(config);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

export function uploadRequest({
  token,
  data,
  method,
  endpoint,
}: IRequest): Promise<any> {

  const config: AxiosRequestConfig = {
    method,
    url: `${import.meta.env.VITE_BASE_URL}${endpoint}`,
    headers: {
      'Content-Type': 'multipart/form-data',    
      'Accept' :   'multipart/form-data'
    },
  };

  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  if (data) {
    config.data = JSON.stringify(data);
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(config);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
