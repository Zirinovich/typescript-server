import {IUsersLogic} from "../../_interfaces/main/IUsersLogic";
export class UsersLogic implements IUsersLogic {

    public i:number = 0;
    login(userName,password){
        //authenticationMiddleware.login
    }
    logout(){
        //authenticationMiddleware.logout
    }
    test(j:number){
        console.log(`i=${this.i}   j=${j}`);
        setTimeout(()=>{
            this.i++;
        },2000);
    }

}