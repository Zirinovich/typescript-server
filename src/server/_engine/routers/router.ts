import {PathParams, RequestHandler, Request} from "express-serve-static-core";
import {authenticationMiddleware, apiRouter, usersLogic} from "../../registration";
import {RuleDto} from "../../../shared/ajaxDto/authentication/RuleDto";
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
import HTTP_STATUS_CODES from 'http-status-enum';

interface AuthorizationResolver {
    idRule: string;
    resolve: (rule: RuleDto, req: Request)=>boolean;
}

export class router {
    static handlersAnonymous = [];
    static handlersAuthenticated = [];

    static all(path: PathParams, handler: RequestHandler, claim: AuthClaims = AuthClaims.Anonymous, ...ruleResolvers: AuthorizationResolver[]) {
        router.push(HttpMethods.ALL, path, handler, claim, ruleResolvers);
    }

    static post(path: PathParams, handler: RequestHandler, claim: AuthClaims = AuthClaims.Anonymous, ...ruleResolvers: AuthorizationResolver[]) {
        router.push(HttpMethods.POST, path, handler, claim, ruleResolvers);
    }

    static get(path: PathParams, handler: RequestHandler, claim: AuthClaims = AuthClaims.Anonymous, ...ruleResolvers: AuthorizationResolver[]) {
        router.push(HttpMethods.GET, path, handler, claim, ruleResolvers);
    }

    private static push(method: HttpMethods, path: PathParams, handler: RequestHandler, claim: AuthClaims, ruleResolvers: AuthorizationResolver[]) {
        if (claim === AuthClaims.Anonymous) {
            this.handlersAnonymous.push({path, handler, method});
            return;
        }
        if (claim === AuthClaims.Authenticated) {
            this.handlersAuthenticated.push({path, handler, method, ruleResolvers});
            return;
        }
        console.log(`Incorrect route AuthClaim! Path: "${HttpMethods[method]}:${path}"`);
    }

    private static resolveAuthorization(ruleResolvers: AuthorizationResolver[]) {
        return async(req, res, next) => {
            let {role} = req.user;
            let ruleIds = ruleResolvers.map(o => o.idRule);
            let rules = await usersLogic.findRulesByRoleIdRuleIdsAsync(role.idrole, ruleIds);
            if (rules.errorCode !== ErrorCodeEnum.NoErrors || rules.data.length !== ruleResolvers.length) {
                console.log(rules.errorMessage ? "Resolve athorization error: " + rules.errorMessage : "RuleResolvers mismatch database rules for path:" + req.originalUrl);
                res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
                    rules
                });
            }
            let nonAuthorized = _.some(rules.data, (rule: RuleDto) => {
                return !(_.find(ruleResolvers, o => o.idRule === rule.idrule).resolve(rule, req));
            });
            if (nonAuthorized) {
                res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
                    errorCode: ErrorCodeEnum.AuthorizationRequiredError,
                    errorMessage: "Authorization required"
                });
            }
            else {
                next();
            }
        };
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
        apiRouter.all('/*', authenticationMiddleware.mustAuthenticate); // все последующие маршруты требуют аутентификацию
        _.forEach(this.handlersAuthenticated, (h: any) => {
            let handlers = h.ruleResolvers.length ? [router.resolveAuthorization(h.ruleResolvers)] : [];
            handlers.push(h.handler);
            if (h.method == HttpMethods.ALL)
                apiRouter.all(h.path, ...handlers);
            if (h.method == HttpMethods.POST)
                apiRouter.post(h.path, ...handlers);
            if (h.method == HttpMethods.GET)
                apiRouter.get(h.path, ...handlers);
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
