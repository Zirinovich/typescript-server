import {router, AuthClaims} from "../../_engine/routers/router";
import HTTP_STATUS_CODES from 'http-status-enum';
import {authenticationMiddleware, usersLogic} from "../../registration";
import {IAjaxResponse} from "../../../shared/ajaxDto/IAjaxResponse";
import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";
import {AccountDto} from "../../../shared/ajaxDto/authentication/AccountDto";
import {UserDto} from "../../../shared/ajaxDto/authentication/UserDto";

router.post('/login',
    (req, res, next) => {
        authenticationMiddleware.login(req, res, next)
    }
);
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
router.post('/main/users/getaccountlist', async(req, res) => {
        let accounts: IAjaxResponse<AccountDto[]> = await usersLogic.getAccountListAsync();
        res.json(accounts);
    },
    AuthClaims.Authenticated);

router.post('/main/users/finduserbyid', async(req, res) => {
    const {id} = req.params;
    let login: IAjaxResponse<LoginDto> = await usersLogic.findLoginByIdAsync(id);
    res.json(login);
}, AuthClaims.Authenticated);

router.post('/main/users/addchangelogin', async(req, res) => {
    const requestData = req.body;
    let login: IAjaxResponse<LoginDto> = await usersLogic.addChangeLoginAsync(requestData);
    res.json(login);
}, AuthClaims.Authenticated);

router.post('/main/users/addchangeuser', async(req, res) => {
    const requestData = req.body;
    let user: IAjaxResponse<UserDto> = await usersLogic.addChangeUserAsync(requestData);
    res.json(user);
}, AuthClaims.Authenticated);

router.post('/main/users/deletelogins', async(req, res) => {
    const requestData = req.body;
    let ids: IAjaxResponse<number[]> = await usersLogic.deleteLoginsAsync(requestData);
    res.json(ids);
}, AuthClaims.Authenticated);
