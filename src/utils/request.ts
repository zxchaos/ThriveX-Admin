import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Modal, notification } from "antd";
import { useUserStore } from "@/stores";

// 配置项目API域名
export const baseURL = "http://localhost:9999/api";
// export const baseURL = "http://82.157.186.125:5000/api";

// 创建 axios 实例
export const instance = axios.create({
    // 项目API根路径
    baseURL,
    // 请求超时的时间
    timeout: 5000,
});

// 请求拦截
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 获取token
        const token = JSON.parse(localStorage.getItem("user_storage") || "{}")?.state.token

        // 如果有token就把赋值给请求头
        if (token) config.headers["Authorization"] = `Bearer ${token}`;

        return config;
    },
    (err: AxiosError) => {
        notification.error({
            message: '请求异常',
            description: err.message,
        })

        return Promise.reject(err);
    }
);

// 响应拦截
instance.interceptors.response.use(
    (res: AxiosResponse) => {
        // 只要code不等于200, 就相当于响应失败
        if (res.data?.code !== 200) {
            notification.error({
                message: '响应异常',
                description: res.data?.message || "未知错误",
            })

            return Promise.reject(res.data);
        }

        return res.data;
    },
    (err: AxiosError) => {
        // 如果code为401就证明认证失败
        if (err.response?.status === 401) {
            Modal.error({
                title: '暂无权限',
                content: '🔒️ 登录已过期，是否重新登录?',
                okText: "去登录",
                onOk: () => {
                    const store = useUserStore.getState()
                    store.quitLogin()
                }
            });

            return Promise.reject(err.response?.data);
        }

        notification.error({
            message: '程序异常',
            description: err.message || "未知错误",
        })

        return Promise.reject(err);
    }
);

// 如果是GET传参就自动识别为query，POST为data
const Request = <T>(method: string, url: string, reqParams?: object) => {
    if (!method) method = "GET";

    return instance.request<any, Response<T>>({
        method,
        url,
        [method.toLocaleUpperCase() === "GET" ? "params" : "data"]: reqParams,
    });
};

export default Request;