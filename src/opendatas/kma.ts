// 기상청 좌표
import config from '../../config.json';
import { Axios } from '../lib/axios';

export class KMA {
    axios: any;

    constructor () {
        this.axios = new Axios(config.kma);
    }

    async getTopList () {
        try {
            const res = await this.axios.get('/top.json.txt');
            return res?.data;
        } catch (err) {
            throw err;
        }
    }

    async getMidList (top: string | number) {
        try {
            const res = await this.axios.get(`/mdl.${top}.json.txt`);
            return res?.data;
        } catch (err) {
            throw err;
        }
    }

    async getLeafList (mid: string | number) {
        try {
            const res = await this.axios.get(`/leaf.${mid}.json.txt`);
            return res?.data;
        } catch (err) {
            throw err;
        }
    }
}