import {Pool, QueryConfig} from 'pg';
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
import {IDbQuery} from "../../_interfaces/engine/database/IDbQuery";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";
var config = require('./../../../../config/database');

export class PostgreEngine {
    static pool = new Pool(config);

    private static transformQuery(query: IDbQuery): QueryConfig {
        if (query.values) {
            let queryText = query.text;
            let queryParams = query.values;
            let newParams = [];

            Object.keys(queryParams).forEach((paramName, i) => {
                queryText = queryText.replace(new RegExp(`(@${paramName})($|:|\\s+|\\)|^_|^-)`, 'g'), `$$${i + 1}$2`);
                newParams.push(queryParams[paramName]);
            });
            return {
                name: query.name && query.name,
                text: queryText,
                values: newParams
            }
        }
        else {
            return {
                name: query.name && query.name,
                text: query.text
            }
        }
    }

    static async querySingleAsync<T>(query: IDbQuery): Promise<IDatabaseResult<T>> {
        return new Promise<IDatabaseResult<T>>((resolve, reject) => {
            PostgreEngine.query(query, (dbResult: IDatabaseResult<Array<T>>) => {
                let res: IDatabaseResult<T> = {
                    errorCode: dbResult.errorCode,
                    errorMessage: dbResult.errorMessage,
                    data: dbResult.data.length > 0 && dbResult.data[0]
                };
                resolve(res);
            });
        });
    }

    static async queryAsync<T>(query: IDbQuery): Promise<IDatabaseResult<Array<T>>> {
        return new Promise<IDatabaseResult<Array<T>>>((resolve, reject) => {
            PostgreEngine.query(query, (dbResult: IDatabaseResult<Array<T>>) => {
                resolve(dbResult);
            });
        });
    }

    private static query<T>(query: IDbQuery, doneCallback: (result: IDatabaseResult<Array<T>>) => void) {
        let pgQuery = PostgreEngine.transformQuery(query);
        PostgreEngine.pool.connect()
            .then(client => {
                client.query(pgQuery)
                    .then(dbResult => {
                        if (dbResult.rowCount) {
                            doneCallback({
                                errorCode: ErrorCodeEnum.NoErrors,
                                data: <Array<T>>dbResult.rows
                            });
                        }
                        doneCallback({
                            errorCode: ErrorCodeEnum.NoErrors,
                            data: []
                        });
                    })
                    .catch(queryError => {
                        doneCallback({
                            errorCode: ErrorCodeEnum.DataBaseQueryError,
                            errorMessage: queryError.toString()
                        });
                    })
            })
            .catch(connectionError => {
                doneCallback({
                    errorCode: ErrorCodeEnum.DataBaseConnectionError,
                    errorMessage: connectionError.toString()
                });
            });
    }
}