// 공공데이터 동네예보조회

import moment from 'moment';
import { Axios } from '../lib/axios';
import config from '../../config.json';
import querystring from 'querystring';

export class Forecast {
    ServiceKey: string;
    base_date: string;
    base_time: string;
    nx: number;
    ny: number;
    axios: any;

    constructor (ServiceKey: string, x: number, y: number, time: string | Date = new Date()) {
        this.ServiceKey = ServiceKey;
        this.base_date = moment(time).format('YYYYMMDD');
        this.base_time = this.getAnnounceTime(Number(moment(time).get('h')));
        this.nx = x;
        this.ny = y;

        this.axios = new Axios(`${config.oepndata}/1360000/VilageFcstInfoService/getVilageFcst`);
        this.axios.setHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
    }

    async getWeather () {
        try {
            let ServiceKey = querystring.unescape(this.ServiceKey);
            this.axios.setParams({
                ServiceKey,
                pageNo: 1,
                numOfRows: 10,
                dataType: 'JSON',
                base_date: this.base_date,
                base_time: this.base_time,
                nx: this.nx,
                ny: this.ny,
            });
    
            const res = await this.axios.get();
            const result = this.makeData(res?.data?.response?.body?.items?.item);
            return result;
        } catch (err) {
            throw err;
        }
    }

    private getAnnounceTime (time: number): string {
        const announceTimes = [2, 5, 8, 11, 14, 17, 20, 23];
        const now = Number(moment().get('h'));
        const announceTime = announceTimes.find(atime => now >= atime && time - 4 <= atime) || 2;
        return announceTime.toString().padStart(2, '0').padEnd(4, '0');
    }
    
    private makeData (data: any): any {
        return data.reduce((acc: any, curr: any) => {
            const d = CATEGORY_DATA[curr.category];
            const value = d.code ? d.code[curr.fcstValue] || 'Error' : curr.fcstValue;
            acc[curr.category] = { name: d.name, value: value + d.unit, missing: d.missing, };
            return acc;
        }, {});
    }
}

const CATEGORY_DATA: ({ [key: string]: any }) = {
    POP: { name: '강수확률', unit: '%', missing: '-1%' },
    PTY: { name: '강수형태', unit: '', missing: '-1', code: { 0: '없음', 1: '비', 2: '비/눈(진눈깨비)', 3: '눈', 4: '소나기' }, },
    R06: { name: '6시간 강수량', unit: '1mm', missing: '-1mm' },
    REH: { name: '습도', unit: '%', missing: '-1%' },
    S06: { name: '6시간 신적설', unit: '1cm', missing: '-1cm' },
    SKY: { name: '하늘상태', unit: '', missing: '-1', code: { 1: '맑음', 2: '구름 조금', 3: '구름 많음', 4: '흐림' }, },
    T3H: { name: '3시간 기온', unit: '℃', missing: '-50℃' },
    TMN: { name: '아침 최저기온', unit: '℃', missing: '-50℃' },
    TMX: { name: '낮 최고기온', unit: '℃', missing: '-50℃' },
    UUU: { name: '풍속(동서성분)', unit: 'm/s', missing: '-100m/s' },
    VVV: { name: '풍속(남북성분)', unit: 'm/s', missing: '-100m/s' },
    WAV: { name: '파고', unit: 'M', missing: '-1m' },
    VEC: { name: '풍향', unit: 'm/s', missing: '-1m/s' },
    WSD: { name: '풍속', unit: '', missing: '-1' },
}