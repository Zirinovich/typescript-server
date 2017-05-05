export interface IUsersLogic {
    i: number;
    test(j: number);
    getList();
    findUserByLogin(login: string, password: string, callback: Function): void;
    findUserById(id: string, callback: Function): void;
}