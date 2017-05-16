import {UserDto} from "../ajaxDto/authentication/UserDto";
import {LoginDto} from "../ajaxDto/authentication/LoginDto";
export interface ISession{
    User?: UserDto,
    Login?: LoginDto,
    //Role?: any
}