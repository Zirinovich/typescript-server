import {HttpContext} from "../../server/_engine/context/HttpContext";
const formData = require('form-urlencoded');

import {IAjaxResponse} from '../ajaxDto/IAjaxResponse';
const config = require('../../../config/main.js');

export class Fetcher {

    static post(request: IAjaxRequest) {
        Fetcher.postAsync(request).then((response) => {
            if (request.callback)
                request.callback(response);
        })
    }

    static async postAsync<T>(request: IAjaxRequest) {
        request.method = HttpMethod.POST;
        return new Promise<IAjaxResponse<T>>((resolve) => {
            Fetcher.sendAsync(request).then(async(response) => {
                resolve(await response.json());
            });
        });
    }

    static get(request: IAjaxRequest) {
        Fetcher.getAsync(request).then((response) => {
            if (request.callback)
                request.callback(response);
        })
    }

    static async getAsync<T>(request: IAjaxRequest) {
        request.method = HttpMethod.GET;
        return new Promise<IAjaxResponse<T>>((resolve) => {
            Fetcher.sendAsync(request).then(async(response) => {
                resolve(await response.json());
            });
        });
    }

    static async sendAsync(request: IAjaxRequest) {
        let body;
        if (request.method == HttpMethod.GET)
            request.url += request.data ? ('?' + $.param(request.data)) : '';
        else
            body = JSON.stringify(request.data);//formData(request.data);
        const requestOptions = {
            method: HttpMethod[request.method],
            credentials: 'same-origin'
        };
        if (global) {
            let cookie;
            if (cookie = HttpContext.GetFromCurrent<string>("cookie"))
                (<any>requestOptions).headers = {
                    'Cookie': cookie
                };
        }
        const requestData = Object.assign(
            requestOptions,
            body && {body, headers: {'Content-Type': 'application/json'}});
        try {
            const url = request.isAbsoluteUrl ? request.url : _.trimEnd(API_HTTP_HOST, "/").concat("/", _.trimStart(request.url, "/"));
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

