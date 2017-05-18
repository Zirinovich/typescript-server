import {IDatabaseResult} from "./IDatabaseResult";
import {IDbQuery} from "./IDbQuery";

export interface IDatabaseEngine {
    querySingleAsync<T>(query: IDbQuery): Promise<IDatabaseResult<T>>;
    queryAsync<T>(query: IDbQuery): Promise<IDatabaseResult<Array<T>>>;
}