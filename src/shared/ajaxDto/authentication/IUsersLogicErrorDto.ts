import {UsersDatabaseErrorEnum} from "./UsersDatabaseErrorEnum";

export interface IUsersLogicErrorDto  {
    message?: string,
    errorType: UsersDatabaseErrorEnum
}