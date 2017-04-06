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