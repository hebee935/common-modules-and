import axios, { AxiosResponse, Method, AxiosRequestConfig, } from 'axios';

export class Axios {
    baseURL: string;
    headers: any;
    params: any;
    data: any;

    constructor (baseURL: string) {
        this.baseURL = baseURL;
        this.headers = { 'Content-Type': 'application/json;charset=utf-8;' };
    }

    public setHeaders(headers: any) {
        this.headers = { ...this.headers, ...headers };
    }

    public setToken(token: string) {
        this.headers['Authorization'] = token;
    }

    public setData(data: any) {
        this.data = data;
    }

    public setParams(params: any) {
        this.params = params;
    }

    public async get(url?: string): Promise<AxiosResponse> {
        return await axios(this.makeConfig('GET', url));
    }

    public async post(url?: string): Promise<AxiosResponse> {
        return await axios(this.makeConfig('POST', url));

    }

    public async put(url?: string): Promise<AxiosResponse> {
        return await axios(this.makeConfig('PUT', url));
    }

    public async delete(url?: string): Promise<AxiosResponse> {
        return await axios(this.makeConfig('DELETE', url));
    }

    private makeConfig(method: Method, url?: string): AxiosRequestConfig {
        return {
            method,
            baseURL: this.baseURL,
            url,
            headers: this.headers,
            params: this.params,
            data: this.data,
        };
    }
}