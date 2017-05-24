import {Pool, QueryConfig} from 'pg';
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
import {IDbQuery} from "../../_interfaces/engine/database/IDbQuery";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";
import {IDatabaseEngine} from "../../_interfaces/engine/database/IDatabaseEngine";
import isNaN = require("lodash/isNaN");

export class PostgreEngine implements IDatabaseEngine {
    private pool: Pool;

    constructor(config) {
        this.pool = new Pool(config);
    }

    private static transformQuery(query: IDbQuery): QueryConfig {
        if (query.values) {
            let queryText = query.text;
            let queryParams = query.values;
            let newParams = [];

            let j=0;
            Object.keys(queryParams).forEach((paramName, i) => {
                let testExp = new RegExp(`(@${paramName}$|@${paramName}[:|\\s+|\\)||,|^_|^-])`);
                if(testExp.test(queryText)){
                    queryText = queryText.replace(new RegExp(`(@${paramName})($|:|\\s+|\\)||,|^_|^-)`, 'g'), `$$${++j}${typeof(queryParams[paramName]) === 'number' ? (/\./.test(queryParams[paramName]) ? '::numeric' : '::integer') : ''}$2`);
                    newParams.push(queryParams[paramName]);
                }
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

    async querySingleAsync<T>(query: IDbQuery): Promise<IDatabaseResult<T>> {
        return new Promise<IDatabaseResult<T>>((resolve) => {
            try {
                this.query(query, (dbResult: IDatabaseResult<Array<T>>) => {
                    console.log("dbResult is " + JSON.stringify(dbResult));
                    let res: IDatabaseResult<T> = {
                        errorCode: dbResult.errorCode,
                        errorMessage: dbResult.errorMessage,
                        data: dbResult.data && dbResult.data.length > 0 && dbResult.data[0]
                    };
                    resolve(res);
                });
            }
            catch (e) {
                console.log("catch e is " + JSON.stringify(e));
                resolve({
                    errorCode: ErrorCodeEnum.DataBaseQueryError,
                    errorMessage: "Some Error Message",
                    data: undefined
                })
            }
        });
    }

    async queryAsync<T>(query: IDbQuery): Promise<IDatabaseResult<Array<T>>> {
        return new Promise<IDatabaseResult<Array<T>>>((resolve, reject) => {
            this.query(query, (dbResult: IDatabaseResult<Array<T>>) => {
                resolve(dbResult);
            });
        });
    }

    private query<T>(query: IDbQuery, doneCallback: (result: IDatabaseResult<Array<T>>) => void) {
        let pgQuery = PostgreEngine.transformQuery(query);
        console.log(pgQuery.text);
        this.pool.connect()
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