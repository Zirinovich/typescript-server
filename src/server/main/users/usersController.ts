import {router, AuthClaims} from "../../_engine/routers/router";
import HTTP_STATUS_CODES from 'http-status-enum';
import {authenticationMiddleware, usersLogic} from "../../registration";

router.post('/login', (req,res)=>{

});
router.post('/logout', (req,res)=>{

},AuthClaims.Authenticated);

router.get('/test', (req, res) => {
    usersLogic.i++;
    usersLogic.test(10);
    res.status(HTTP_STATUS_CODES.OK).json(req.user);
});

router.get('/article/:articleId', (req, res) => {
    const {articleId} = req.params;
    res.status(articleId === "3" ? HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR : HTTP_STATUS_CODES.OK).send(`${articleId}${articleId}${articleId}${articleId} Lorem ipsum dolor sit amet, ne duo saepe prompta recteque. Postulant deterruisset cu pri. Est ne scaevola hendrerit persecuti, oporteat adolescens appellantur usu ne, usu putent nusquam perfecto cu. Eu utinam democritum qui, duo vidisse gloriatur no. At nobis putent duo.`);
});
