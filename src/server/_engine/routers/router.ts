import {RequestHandlerParams, PathParams, RequestHandler} from "express-serve-static-core";
import Ioc from "../../../shared/classes/ioc";
import {IAuthenticationMiddleware} from "../../../shared/ajaxDto/authentication/IAuthenticationMiddleware";
import {apiRouter} from "./serverRouter";
export class router {
    static handlersAnonymous = [];
    static handlersAuthenticated = [];
    private static authenticationMiddleware = Ioc.resolve<IAuthenticationMiddleware>("IAuthenticationMiddleware");

    static all(path: PathParams, handler: RequestHandler, claim?: AuthClaims) {
        router.push(HttpMethods.ALL, path, handler, claim);
    }

    static post(path: PathParams, handler: RequestHandler, claim?: AuthClaims) {
        router.push(HttpMethods.POST, path, handler, claim);
    }

    static get(path: PathParams, handler: RequestHandler, claim?: AuthClaims) {
        router.push(HttpMethods.GET, path, handler, claim);
    }

    private static push(method: HttpMethods, path: PathParams, handler: RequestHandler, claim?: AuthClaims) {
        if (claim == undefined || claim == AuthClaims.Anonymous) {
            this.handlersAnonymous.push({path, handler, method});
        }
        if (claim == AuthClaims.Authenticated) {
            this.handlersAuthenticated.push({path, handler, method});
        }
    }

    static init() {
        _.forEach(this.handlersAnonymous, (h: any) => {
            if (h.method == HttpMethods.ALL)
                apiRouter.all(h.path, h.handler);
            if (h.method == HttpMethods.POST)
                apiRouter.post(h.path, h.handler);
            if (h.method == HttpMethods.GET)
                apiRouter.get(h.path, h.handler);
        });
        apiRouter.all('/*', router.authenticationMiddleware.mustAuthenticate); // все последующие маршруты требуют аутентификацию
        _.forEach(this.handlersAuthenticated, (h: any) => {
            if (h.method == HttpMethods.ALL)
                apiRouter.all(h.path, h.handler);
            if (h.method == HttpMethods.POST)
                apiRouter.post(h.path, h.handler);
            if (h.method == HttpMethods.GET)
                apiRouter.get(h.path, h.handler);
        });
    }
}
export enum AuthClaims {
    Anonymous = 0,
    Authenticated = 1,
}
enum HttpMethods {
    ALL = 0,
    GET = 1,
    POST = 2,
}
