import {Pool, QueryConfig, QueryResult} from 'pg';
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
import {IDbQuery} from "../../_interfaces/engine/database/IDbQuery";
import {IQueryResult} from "../../_interfaces/engine/database/IQueryResult";
import {IDbEngineError} from "../../_interfaces/engine/database/IDbEngineError";
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

    static executeQuery<T>(query: IDbQuery, doneCallback: (result: IDatabaseResult<Array<T>>)=>void) {

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

    static async executeQueryAsync<T>(query: IDbQuery): Promise<IDatabaseResult<Array<T>>> {
        return new Promise<IDatabaseResult<Array<T>>>((resolve, reject) => {
            PostgreEngine.executeQuery(query, (dbResult: IDatabaseResult<Array<T>>) => {
                resolve(dbResult);
            });
        });
    }
}