import {PostgreEngine} from "./PostgreEngine";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";

export class PostgreEngineHelpers {
    static async getSingleEntity<T>(query: string, values?: any): Promise<IDatabaseResult<T>> {
        return new Promise<IDatabaseResult<T>>(async resolve => {
            let result = await PostgreEngine.executeQueryAsync<T>({
                text: query,
                values: values && values
            });
            resolve({
                errorCode: result.errorCode,
                errorMessage: result.errorMessage,
                data: result.data.length > 0 && result.data[0]
            })
        });
    }

    static async getMultipleEntities<T>(query: string, values?: any): Promise<IDatabaseResult<T[]>> {
        return new Promise<IDatabaseResult<T[]>>(async resolve => {
            let result = await PostgreEngine.executeQueryAsync<T>({
                text: query,
                values: values && values
            });
            resolve({
                errorCode: result.errorCode,
                errorMessage: result.errorMessage,
                data: result.data.length > 0 && result.data
            });
        });
    }
}