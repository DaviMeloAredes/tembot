import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

import { MissingParamError } from '../errors/MissingParam.error';
import { RequestControllerAdapterInterface } from '../adapters/Request.controller.adapter';

export class RequestController implements RequestControllerAdapterInterface {
    _dc_url: string;

    constructor () {
        this._dc_url = `https://discord.com/api/v10/applications/${process.env.CLIENT_ID}`;
    }

    makeRequest (url: string, method: 'post' | 'get', options?: any) {
        if (method == 'post' && !options.data) {
            throw new MissingParamError('data');
        }

        const _options = { method, ...options };

        return new Promise(async (resolve, reject) => {
            await axios(url, _options)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }
}
