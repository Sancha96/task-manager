import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const baseURL =
    process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_API_URL
        : window.location.origin;

export const configAxios: (logout: () => void, store: any) => void = (logout, store) => {
    const onRequestSuccess = (config: AxiosRequestConfig): AxiosRequestConfig => {
        const token = store.getState(store)?.auth?.data?.access_token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        config.url = `${baseURL}${config.url}`;
        return config;
    };

    const onRequestError = async (err: any) => {
        return Promise.reject(err);
    };

    const onResponseSuccess = (config: AxiosResponse) => config;

    const onResponseError = (error: AxiosError) => {
        const { response } = error;
        if (response?.status === 401) {
            logout();
        }
        return Promise.reject(error);
    };

    axios.interceptors.request.use(onRequestSuccess, onRequestError);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};
