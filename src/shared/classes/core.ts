const formData = require('form-urlencoded');

import {IAjaxResponse} from '../ajaxDto/IAjaxResponse';
const config = require('../../../config/main.js');

export class Core {

    static post(request: IAjaxRequest) {
        Core.postAsync(request).then((response) => {
            if (request.callback)
                request.callback(response);
        })
    }

    static async postAsync<T>(request: IAjaxRequest) {
        request.method = HttpMethod.POST;
        return new Promise<IAjaxResponse<T>>((resolve) => {
            Core.sendAsync(request).then(async(response) => {
                resolve(await response.json());
            });
        });
    }

    static get(request: IAjaxRequest) {
        Core.getAsync(request).then((response) => {
            if (request.callback)
                request.callback(response);
        })
    }

    static async getAsync<T>(request: IAjaxRequest) {
        request.method = HttpMethod.GET;
        return new Promise<IAjaxResponse<T>>((resolve) => {
            Core.sendAsync(request).then(async(response) => {
                resolve(await response.json());
            });
        });
    }

    static async sendAsync(request: IAjaxRequest) {
        var body;
        if (request.method == HttpMethod.GET)
            request.url += request.data ? ('?' + $.param(request.data)) : '';
        else
            body = formData(request.data);
        const requestOptions = {
            method: HttpMethod[request.method],
            credentials: 'same-origin'
        };
        const requestData = Object.assign(
            requestOptions,
            body && {body, headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
        try {
            const url = request.isAbsoluteUrl ? request.url : API_HTTP_HOST + request.url;
            return fetch(url, requestData);
        }
        catch (error) {
            throw error;
        }
    }
}
export enum HttpMethod{
    GET,
    POST
}
export interface IAjaxRequest {
    url: string,
    isAbsoluteUrl?: boolean;
    method?: HttpMethod,
    data?: any,
    callback?: (response)=>void
}

