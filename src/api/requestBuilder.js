import axios, {AxiosError, AxiosPromise, AxiosRequestConfig, AxiosRequestHeaders} from 'axios';
import {store} from "../redux/store";
import {logout} from "../redux/slices";
import {API_BASE_URL} from "../config";
import Toast from "react-native-toast-message";

export type HTTPMethod = 'get' | 'post' | 'delete' | 'put' | 'patch';

export interface JsonBody {
    [key: string]: any;
}

export interface Request {
    method: HTTPMethod;
    url: string;
    body?: JsonBody;
    params?: any;
}


const buildRequest = (request: Request) => {
    const {body, method, url, params} = request;
    const contentType = body instanceof FormData ? 'multipart/form-data' : 'application/json; charset=utf-8';
    let headers: AxiosRequestHeaders = {
        'Content-Type': contentType,
    };

    const requestConfig: AxiosRequestConfig = {
        baseURL: API_BASE_URL,
        data: body,
        headers,
        withCredentials: true,
        method,
        url,
        params
    };
    return requestConfig;
};

export const defaultResponse: Partial<AxiosError['response']> = {
    status: 500,
    data: {
        error: 'Server error',
    },
};

export const formatError = (responseError: AxiosError) => {
    const response = (responseError.response?.data ? responseError.response : defaultResponse);
    let errorMessage = response.data && (response.data.message || response.data.error || "Something went wrong!");
    let errors = (response.data && response.data.data);

    if (typeof (errorMessage) === "string" && (["invalid token", "missing authentication token"].includes(errorMessage.toLowerCase().trim()))) {
        store.dispatch(logout());
        errorMessage = "session.expired";
        Toast.show({type: 'error', isVisible: true, text1: 'Session Expired', visibilityTime: 4000, position: 'top'})
    }
    return {
        code: response.status,
        message: errorMessage,
        errors: errors ?? []
    };
};

export const makeRequest = async (request: Request) => {
    const requestConfig = buildRequest(request);
    return new Promise((resolve, reject) => {
        const axiosRequest: AxiosPromise = axios(requestConfig);
        axiosRequest
            .then(resolve)
            .catch((error: AxiosError) => {
                reject(formatError(error));
            });
    });
};
