import {router, AuthClaims} from "../../_engine/routers/router";
import {IAuthenticationMiddleware} from "../../../shared/ajaxDto/authentication/IAuthenticationMiddleware";
import Ioc from "../../../shared/classes/ioc";
let authenticationMiddleware = Ioc.resolve<IAuthenticationMiddleware>("IAuthenticationMiddleware");
import HTTP_STATUS_CODES from 'http-status-enum';

router.post('/logout', authenticationMiddleware.logout,AuthClaims.Authenticated);
router.post('/login', authenticationMiddleware.login);
router.get('/test', (req, res) => {
    res.status(HTTP_STATUS_CODES.OK).json(req.user);
});

router.get('/article/:articleId', (req, res) => {
    const {articleId} = req.params;
    res.status(articleId === "3" ? HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR : HTTP_STATUS_CODES.OK).send(`${articleId}${articleId}${articleId}${articleId} Lorem ipsum dolor sit amet, ne duo saepe prompta recteque. Postulant deterruisset cu pri. Est ne scaevola hendrerit persecuti, oporteat adolescens appellantur usu ne, usu putent nusquam perfecto cu. Eu utinam democritum qui, duo vidisse gloriatur no. At nobis putent duo.`);
});
router.all('/*', (req, res) => {
    res.send(req.url + " съешь же ещё этих мягких французских булок, да выпей чаю!");
});
