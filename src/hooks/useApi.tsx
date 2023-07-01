import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { apiRequest, uploadRequest } from "../services/api";
import { useLocalStorage } from "./useLocalStorage";

interface IGet<T> {
  name: string;
  endpoint: string;
  onSuccessCallback?(data: any): void;
  onErrorCallback?(): void;
  page?: number;
  limit?: number;
  search?: string;
  filter?: object;
}

export function useCustomGet<T>({
                            name,
                            endpoint,
                            onSuccessCallback,
                            onErrorCallback,
                            page,
                            limit,
                            search,
                            filter,
                          }: IGet<T>) {
  const navigate = useNavigate();
  const [user] = useLocalStorage("user");

  function getData(page: number | undefined,
                   limit: number | undefined,
                   search: string | undefined,
                   filter: object | undefined) {
    let params = new URLSearchParams();
    if (page) {
      params.append("page", page.toString());
    }
    if (limit) {
      params.append("limit", limit.toString());
    }
    if (search) {
      params.append("search", search);
    }

    if (filter) {
      Object.entries(filter).map((item) => {
        if (item[1] !== undefined) params.append(item[0], item[1]);
      });
    }
    return apiRequest({
      token: user?.token,
      method: "GET",
      endpoint: `${endpoint}?${params}`,
      responseType: 'json'
    });
  }
  return useQuery<T>([name, page,limit,search,filter], () => getData(page,limit,search,filter), {
    onSuccess: (data) => {
      if (onSuccessCallback) onSuccessCallback!(data);
    },
    onError: (error: any) => {
      if (error?.response?.status === 500) {
        navigate("/500");
      } else if (error?.response?.status === 401) navigate("/401");
    },
    // keepPreviousData: true,
    // enabled:Boolean(filter)
  });
}

export function useGet<T>({
  name,
  endpoint,
  onSuccessCallback,
  onErrorCallback,
  page,
  limit,
  search,
  filter,
}: IGet<T>) {
  const navigate = useNavigate();
  const [user] = useLocalStorage("user");

  function getData(page: number | undefined) {
    let params = new URLSearchParams();
    if (page) {
      params.append("page", page.toString());
    }
    if (limit) {
      params.append("limit", limit.toString());
    }
    if (search) {
      params.append("search", search);
    }

    if (filter) {
      Object.entries(filter).map((item) => {
        if (item[1] !== undefined) params.append(item[0], item[1]);
      });
    }
    return apiRequest({
      token: user?.token,
      method: "GET",
      endpoint: `${endpoint}?${params}`,
      responseType: 'json'
    });
  }
  return useQuery<T>([name, page], () => getData(page), {
    onSuccess: (data) => {
      if (onSuccessCallback) onSuccessCallback!(data);
    },
    onError: (error: any) => {
      if (error?.response?.status === 500) {
        navigate("/500");
      } else if (error?.response?.status === 401) navigate("/401");
    },
    // keepPreviousData: true,
    // enabled:Boolean(filter)
  });
}

interface IGenericPos {
  name: string | null;
  endpoint: string;
  data?: any;
  onSuccessCallback?(data: any): void;
  onErrorCallback?(error: any): void;
}

interface IPost extends IGenericPos {
  method: "POST" | "PUT" | "DELETE";
}


export function usePost<T>(props: IGenericPos) {
  return useGenericPost<T>({ ...props, method: "POST" });
}

export function usePut<T>(props: IGenericPos) {
  return useGenericPost<T>({ ...props, method: "PUT" });
}

export function useDelete<T>(props: IGenericPos) {
  return useGenericPost<T>({ ...props, method: "DELETE" });
}

function useGenericPost<T>({
  name,
  endpoint,
  method,
  onSuccessCallback,
  onErrorCallback,
}: IPost) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [user] = useLocalStorage("user");
  function storeData(data: T) {
    return apiRequest({
      token: user?.token,
      method,
      endpoint,
      data,
      responseType: "json"
    });
  }
  return useMutation(storeData, {
    onSuccess: (data) => {
      if (name) {
        let realNames = name.split(',');
        realNames.map((myName) => {
          queryClient.invalidateQueries({ queryKey: [myName] })
        }) 
        
      };
      if (onSuccessCallback) onSuccessCallback!(data);
    },
    onError: (error: any) => {
      if (error?.response?.status === 500) {
        navigate("/500");
      } else if (error?.response?.status === 401) navigate("/401");
      if (onErrorCallback) onErrorCallback!(error);
    },
  });
}

export function useUploadPost<T>(props: IGenericPos) {
  return useGenericUpload<T>({ ...props, method: "POST" });
}

export function useUploadPut<T>(props: IGenericPos) {
  return useGenericUpload<T>({ ...props, method: "PUT" });
}

function useGenericUpload<T>({
  name,
  endpoint,
  method,
  onSuccessCallback,
  onErrorCallback,
}: IPost) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [user] = useLocalStorage("user");
  function storeData(data: T) {
    return uploadRequest({
      token: user?.token,
      method,
      endpoint,
      data,
      responseType: "json"
    });
  }
  return useMutation(storeData, {
    onSuccess: (data) => {
      if (name) queryClient.invalidateQueries({ queryKey: [name] });
      if (onSuccessCallback) onSuccessCallback!(data);
    },
    onError: (error: any) => {
      if (error?.response?.status === 500) {
        navigate("/500");
      } else if (error?.response?.status === 401) navigate("/401");
      if (onErrorCallback) onErrorCallback!(error);
    },
  });
}


export function useExport<T>({
  name,
  endpoint,
  method,
  onSuccessCallback,
  onErrorCallback,
  filename,
}: IPost & {filename: string}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [user] = useLocalStorage("user");
  function storeData(data: T) {
    return apiRequest({
      token: user?.token,
      method,
      endpoint,
      data,
      responseType: "blob"
    });
  }
  return useMutation(storeData, {
    onSuccess: (data) => {
      if (name) {
        let realNames = name.split(',');
        realNames.map((myName) => {
          queryClient.invalidateQueries({ queryKey: [myName] })
        }) 
      };

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      if (onSuccessCallback) onSuccessCallback!(data);
    },
    onError: (error: any) => {
      if (error?.response?.status === 500) {
        navigate("/500");
      } else if (error?.response?.status === 401) navigate("/401");
      if (onErrorCallback) onErrorCallback!(error);
    },
  });
}