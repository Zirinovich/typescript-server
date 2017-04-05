import {IAjaxRequest, HttpMethod, IResponseAjax} from "../interfaces/core/dto/AjaxDTOs";
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
    static async sendAsync(request:IAjaxRequest) {
        const body = formData(request.data);
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
