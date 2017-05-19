import {router, AuthClaims} from "../../_engine/routers/router";
import HTTP_STATUS_CODES from 'http-status-enum';
import {authenticationMiddleware, usersLogic} from "../../registration";
import {IAjaxResponse} from "../../../shared/ajaxDto/IAjaxResponse";
import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";

router.post('/login', authenticationMiddleware.login);
router.post('/logout', authenticationMiddleware.logout, AuthClaims.Authenticated);

router.get('/article/:articleId', (req, res) => {
    const {articleId} = req.params;
    res.status(articleId === "3" ? HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR : HTTP_STATUS_CODES.OK).send(`${articleId}${articleId}${articleId}${articleId} Lorem ipsum dolor sit amet, ne duo saepe prompta recteque. Postulant deterruisset cu pri. Est ne scaevola hendrerit persecuti, oporteat adolescens appellantur usu ne, usu putent nusquam perfecto cu. Eu utinam democritum qui, duo vidisse gloriatur no. At nobis putent duo.`);
});
router.post('/main/users/getloginlist', async(req, res) => {
        let logins: IAjaxResponse<LoginDto[]> = await usersLogic.getLoginListAsync();
        res.json(logins);
    },
    AuthClaims.Authenticated);

router.post('/main/users/finduserbyid', async(req, res) => {
    const {id} = req.params;
    let login: IAjaxResponse<LoginDto> = await usersLogic.findLoginByIdAsync(id);
    res.json(login);
});
