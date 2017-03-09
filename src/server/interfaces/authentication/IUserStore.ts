export interface IUserStore {
    FindUser(username: string, password: string, callback: Function): void;
    FindUserById(id: string, callback: Function): void;
}