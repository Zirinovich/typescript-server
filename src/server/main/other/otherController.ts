import {router, AuthClaims} from "../../_engine/routers/router";
import HTTP_STATUS_CODES from 'http-status-enum';
import {authenticationMiddleware, usersLogic} from "../../registration";
router.get('/test2', (req, res) => {
    usersLogic.i++;
    usersLogic.test(10);
    res.status(HTTP_STATUS_CODES.OK).json(req.user);
});