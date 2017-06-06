import {router, AuthClaims} from "../../_engine/routers/router";
import HTTP_STATUS_CODES from 'http-status-enum';
import {authenticationMiddleware, usersLogic} from "../../registration";
import {IAjaxResponse} from "../../../shared/ajaxDto/IAjaxResponse";
import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";
import {AccountDto} from "../../../shared/ajaxDto/authentication/AccountDto";
import {UserDto} from "../../../shared/ajaxDto/authentication/UserDto";
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
import {RuleDto} from "../../../shared/ajaxDto/authentication/RuleDto";

router.post('/logout', authenticationMiddleware.logout, AuthClaims.Authenticated);

router.post('/login',
    (req, res, next) => {
        authenticationMiddleware.login(req, res, next)
    }
);

router.post('/main/secure/obtainsession', (req, res) => {
    if (req.user) {
        return res.json({
            errorCode: ErrorCodeEnum.NoErrors,
            data: req.user
        });
    }
    res.json({
        errorCode: ErrorCodeEnum.UnexpectedError,
        errorMessage: "Unexpected error inside 'passport'. User authenticated, but 'req.user' is empty!"
    });
}, AuthClaims.Authenticated);

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

router.post('/main/users/findlogin', async(req, res) => {
    const id = req.body;
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
    const ids = req.body;
    let deleted = await usersLogic.deleteLoginsAsync(ids);
    res.json(deleted);
}, AuthClaims.Authenticated);


router.post('/main/users/getrolerules', async(req, res) => {
        const {idrole} = req.body;
        let rulesResult = await usersLogic.findRulesByRoleIdAsync(idrole);
        res.json(rulesResult);
    },
    AuthClaims.Authenticated,
    {
        idRule: "/main/users/getrolerules",
        resolve: (ruleDto, req) => {
            return ruleDto.value == "true";
        }
    }
);

router.post('/main/users/addchangerolerules', async(req, res) => {
        const rulesDto: RuleDto[] = req.body;
        let result = await usersLogic.addChangeRulesInRole(rulesDto);
        res.json(result);
    },
    AuthClaims.Authenticated,
    {
        idRule: "/main/users/addchangerolerules",
        resolve: (ruleDto, req) => {
            return ruleDto.value == "true";
        }
    }
);

router.post('/main/users/getrolelist', async(req, res) => {
        let result = await usersLogic.getRoleListAsync();
        return res.json(result);
    },
    AuthClaims.Authenticated
);

router.post('/main/users/findrole', async(req, res) => {
        const idrole = req.body;
        let result = await usersLogic.findRoleByIdAsync(idrole);
        res.json(result);
    },
    AuthClaims.Authenticated
);

router.post('/main/users/addchangerole', async(req, res) => {
        const role = req.body;
        let result = await usersLogic.addChangeRoleAsync(role);
        res.json(result);
    },
    AuthClaims.Authenticated
);

router.post('/main/users/deleteroles', async(req, res) => {
        const ids = req.body;
        let result = await usersLogic.deleteRolesAsync(ids);
        res.json(result)
    },
    AuthClaims.Authenticated
);

router.post('/main/users/findaccount', async(req, res) => {
        const idlogin = req.body;
        let result = await usersLogic.findAccountByLoginId(idlogin);
        res.json(result);
    },
    AuthClaims.Authenticated
);