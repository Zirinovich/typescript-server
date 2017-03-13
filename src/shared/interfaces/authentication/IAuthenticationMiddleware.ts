export interface IAuthenticationMiddleware{
    login(req, res, next);
    logout(req, res);
    mustAuthenticate(req, res, next);
}