import axios, { AxiosResponse } from 'axios';

export default class Request {
    url: string;
    headers: any;
    data: any;

    constructor (url: string) {
        this.url = url;
        this.headers = { 'Content-Type': 'application/json; charset=utf-8;' };
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

    public async get(): Promise<AxiosResponse> {
        return await axios.get(this.url, { headers: this.headers });
    }

    public async post(): Promise<AxiosResponse> {
        return await axios.post(this.url, this.data, { headers: this.headers });
    }

    public async put(): Promise<AxiosResponse> {
        return await axios.put(this.url, this.data, { headers: this.headers });
    }

    public async delete(): Promise<AxiosResponse> {
        return await axios.delete(this.url, { headers: this.headers });
    }
}