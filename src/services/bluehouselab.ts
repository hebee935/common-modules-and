import Request from '../lib/request';
import config from '../../config.json';

export class BlueHouseLab {
    appID: string;
    apiKey: string;
    sender: string;
    credential: string;

    receivers: string[];
    content: string;

    request: any;

    constructor(appID: string, apiKey: string, sender: string, content: string = '') {
        this.appID = appID;
        this.apiKey = apiKey;
        this.sender = sender;
        this.receivers = [];
        this.content = content;
        this.credential = `Basic ${Buffer.from(this.appID + ':' + this.apiKey).toString('base64') }`;

        this.request = new Request(config.bluehouselab);
        this.request.setToken(this.credential);
    }

    setContent(message: string): void {
        this.content = message;
    }

    addReceiver(receiver: string): void {
        this.receivers.push(receiver);
    }

    getReceivers(): string[] {
        return this.receivers;
    }

    async sendTo(receiver: string, content?: string): Promise<any> {
        try {
            this.request.setData({ content: content || this.content, receivers: [receiver], sender: this.sender, });
            return await this.request.post();
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    async sendToAll(): Promise<any> {
        try {
            this.request.setData({ content: this.content, receivers: this.receivers, sender: this.sender, });
            return await this.request.post();
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}