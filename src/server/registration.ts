import * as express from 'express';
import Ioc from "../shared/classes/ioc";
import {PassportLocalStrategyMiddlewareFunctions} from './_engine/middlewares/authenticationPassport/PassportLocalStrategyMiddlewareFunctions';
import {IAuthenticationMiddleware} from "./_interfaces/engine/IAuthenticationMiddleware";
import {UsersDatabase} from "./main/users/UsersDatabase";
import {IUsersDatabase} from "./_interfaces/main/IUsersDatabase";
import {router} from "./_engine/routers/router";
import {IUsersLogic} from "./_interfaces/main/IUsersLogic";
import {UsersLogic} from "./main/users/UsersLogic";
import {IDatabaseEngine} from "./_interfaces/engine/database/IDatabaseEngine";
import {PostgreEngine} from "./_engine/database/postgreEngine";
import {ExpressSessionTuner} from "./_engine/middlewares/common/ExpressSessionTuner";
import {ExpressCommonTuner} from "./_engine/middlewares/common/ExpressCommonTuner";
import {PassportLocalStrategyTuner} from "./_engine/middlewares/authenticationPassport/PassportLocalStrategyTuner";
import {IContentLogic} from "./_interfaces/main/IContentLogic";
import {ContentLogic} from "./main/content/ContentLogic";
import {IContentDatabase} from "./_interfaces/main/IContentDatabase";
import {ContentDatabase} from "./main/content/ContentDatabase";

const databaseConfig = require('./../../config/database');

//----------------------------- Express Api
const app = express();
export const apiRouter = express.Router();
ExpressCommonTuner.Setup(app);
ExpressSessionTuner.Setup(app);
PassportLocalStrategyTuner.Setup(app);
app.use("/api", apiRouter);

//----------------------------- IoC
export const authenticationMiddleware: IAuthenticationMiddleware = Ioc.register<IAuthenticationMiddleware>("IAuthenticationMiddleware", true, new PassportLocalStrategyMiddlewareFunctions());
export const dbEngine: IDatabaseEngine = Ioc.register<IDatabaseEngine>("IDatabaseEngine", true, new PostgreEngine(databaseConfig));
export const usersDatabase: IUsersDatabase = Ioc.register<IUsersDatabase>("IUsersDatabase", true, new UsersDatabase());
export const usersLogic: IUsersLogic = Ioc.register<IUsersLogic>("IUsersLogic", true, new UsersLogic());
export const contentDatabase: IContentDatabase = Ioc.register<IContentDatabase>("IContentDatabase", true, new ContentDatabase());
export const contentLogic: IContentLogic = Ioc.register<IContentLogic>("IContentLogic", true, new ContentLogic());
//----------------------------- Controllers
require("./main/users/usersController");
require("./main/other/otherController");
require("./main/content/contentController");
router.init();

//----------------------------------- exports
export const appApi = app;
