const formData = require('form-urlencoded');

export class Core {

    static post(request:IAjaxRequest) {
        Core.postAsync(request).then((response)=>{
            if(request.callback)
                request.callback(response);
        })
    }
    static async postAsync(request:IAjaxRequest) {
        request.method = HttpMethod.POST;
        return new Promise<IResponseAjax>((resolve) => {
            Core.sendAsync(request).then(async(response) => {
                resolve({
                    isSuccess: response.ok,
                    errorMessage: response.ok ? undefined : response.statusText,
                    data: await response.json()
                });
            });
        });
    }
    static get(request:IAjaxRequest) {
        Core.getAsync(request).then((response)=>{
            if(request.callback)
                request.callback(response);
        })
    }
    static async getAsync(request:IAjaxRequest) {
        request.method = HttpMethod.GET;
        return new Promise<IResponseAjax>((resolve) => {
            Core.sendAsync(request).then(async(response) => {
                resolve({
                    isSuccess: response.ok,
                    errorMessage: response.ok ? undefined : response.statusText,
                    data: await response.json()
                });
            });
        });
    }
    static async sendAsync(request:IAjaxRequest) {
        var body;
        if(request.method == HttpMethod.GET)
            request.url += request.data && ("?"+$.param(request.data));
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
            return fetch(request.url, requestData);
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
    url:string,
    method?:HttpMethod,
    data?:any,
    callback?:(response)=>void
}
export interface IResponseAjax{
    isSuccess:boolean,
    errorMessage?:string,
    data:any
}
