import { Axios } from '../lib/axios';

export class Slack {
    uri: string;
    username: string;
    icon_url?: string;

    axios: any;

    constructor(uri: string, username: string, icon_url?: string) {
        this.uri = uri;
        this.username = username;
        this.icon_url = icon_url;

        this.axios = new Axios(this.uri);
    }

    async send(text: string) {
        try {
            this.axios.setData({ username: this.username, icon_url: this.icon_url, text, });
            return await this.axios.post();
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}