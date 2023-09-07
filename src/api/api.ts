import axios, { InternalAxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';

const http: AxiosInstance = axios.create({
  timeout : 30000,
  baseURL : process.env.VUE_APP_API_URL,
});

if (process.env.VUE_APP_MODE === "development") {
  console.log("开发");
} else if (process.env.VUE_APP_MODE === "test") {
  console.log("测试");
} else {
  console.log("正式");
}
// 添加请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
  // 在发送请求之前做些什么
  return config;
  },
  (error: any) => {
  // 处理请求错误a
  return Promise.reject(error);
  },
);

// 添加响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
  // 对响应数据做点什么
  return response;
  },
  (error: any) => {
  // 处理响应错误
  return Promise.reject(error);
  },
);
export const get = <T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> => {
  return http.get<T>(url, config).then(response => response.data);
};

export const post = <T>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T> => {
  return http.post<T>(url, data, config).then(response => response.data);
};
export default http;
