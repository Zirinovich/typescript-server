const formData = require('form-urlencoded');

export enum HttpMethod{
    GET,
    POST
}

export class Core {
    static async SENDAsync(url: string, method: HttpMethod, data?: any, options?: any) {
        const body = formData(data);
        const requestOptions = {
            method: HttpMethod[method],
            credentials: 'same-origin'
        };
        const requestData = Object.assign(
            requestOptions,
            body && {body, headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
            {...options});
        try {
            return fetch(url, requestData);
        }
        catch (error) {
            throw error;
        }
    }

    static async GETAsync(url: string, data?: any, options?: any) {
        return Core.SENDAsync(url, HttpMethod.GET, data, options);
    }

    static async POSTAsync(url: string, data?: any, options?: any) {
        return Core.SENDjsonAsync(url, HttpMethod.POST, data, options);
    }

    static async SENDjsonAsync(url: string, method: HttpMethod, data?: any, options?: any) {
        return (await Core.SENDAsync(url, method, data, options)).json();
    }

    static async GETjsonAsync(url: string, data?: any, options?: any) {
        return Core.SENDjsonAsync(url, HttpMethod.GET, data, options);
    }

    static async POSTjsonAsync(url: string, data?: any, options?: any) {
        return Core.SENDjsonAsync(url, HttpMethod.POST, data, options);
    }
}
