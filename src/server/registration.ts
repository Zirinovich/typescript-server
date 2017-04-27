import Ioc from "../shared/classes/ioc";
import {PassportLocalStrategyMiddlewareFunctions} from './_engine/middlewares/authenticationPassport/PassportLocalStrategyMiddlewareFunctions';
import {IAuthenticationMiddleware} from "./_interfaces/engine/IAuthenticationMiddleware";
import {UsersDatabase} from "./main/users/UsersDatabase";
import {IUsersDatabase} from "./_interfaces/main/IUsersDatabase";
import {router} from "./_engine/routers/router";
import {IUsersLogic} from "./_interfaces/main/IUsersLogic";
import {UsersLogic} from "./main/users/UsersLogic";
//----------------------------- IoC
export const authenticationMiddleware: IAuthenticationMiddleware = Ioc.register<IAuthenticationMiddleware>("IAuthenticationMiddleware", true, new PassportLocalStrategyMiddlewareFunctions());
export var usersLogic: IUsersLogic = Ioc.register<IUsersLogic>("IUsersLogic", true, new UsersLogic());
export const usersDatabase: IUsersDatabase = Ioc.register<IUsersDatabase>("IUsersDatabase", true, new UsersDatabase());
//----------------------------- Controllers
usersLogic.i++;
usersLogic.i++;
require("./main/users/usersController");
require("./main/other/otherController");
router.init();

