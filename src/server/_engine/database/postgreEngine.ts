import {Pool, QueryConfig} from 'pg';
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
import {IDbQuery} from "../../_interfaces/engine/database/IDbQuery";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";
import {IDatabaseEngine} from "../../_interfaces/engine/database/IDatabaseEngine";

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

            let dictionary: Map<string, {value: any,postfix: string}> = new Map<string, {value: any,postfix: string}>();


            _.forOwn(queryParams, (value, key) => {
                switch (typeof value) {
                    case "number":
                        if (/\./.test(value)) {
                            dictionary.set("@" + key, {value: value, postfix: "::numeric"});
                        }
                        else {
                            dictionary.set("@" + key, {value: value, postfix: "::integer"});
                        }
                        break;
                    case "object":
                        let regex = new RegExp(`[Ii][Nn]\s*\(\s*@${key}\s*\)`, "g");
                        if (_.isArray(value) && regex.test(queryText)) {
                            let postfix = typeof(value[0]) === "number" ? (/\./.test(value[0].toString()) ? "::numeric" : "::integer") : "";
                            let whereInParams = [];
                            _.forEach(value, (o, i) => {
                                whereInParams.push("@" + key + "~" + i);
                                dictionary.set("@" + key + "~" + i, {value, postfix});
                            });
                            queryText = queryText.replace(regex, `IN (${whereInParams.join(",")})`);
                            break;
                        }
                    default:
                        dictionary.set("@" + key, {value: value, postfix: ""});
                        break;
                }

            });
            let j = 0;
            dictionary.forEach((val, key) => {
                let testExp = new RegExp(`(${key}$|${key}[:|\\s+|\\)||,|^_|^-])`);
                if (testExp.test(queryText)) {
                    queryText = queryText.replace(new RegExp(`(${key})($|:|\\s+|\\)||,|^_|^-)`, 'g'), `$$${++j}${val.postfix}$2`);
                    newParams.push(val.value);
                }
            });


            /*Object.keys(queryParams).forEach((paramName, i) => {
             let testExp = new RegExp(`(@${paramName}$|@${paramName}[:|\\s+|\\)||,|^_|^-])`);
             if (testExp.test(queryText)) {
             queryText = queryText.replace(new RegExp(`(@${paramName})($|:|\\s+|\\)||,|^_|^-)`, 'g'), `$$${++j}${typeof(queryParams[paramName]) === 'number' ? (/\./.test(queryParams[paramName]) ? '::numeric' : '::integer') : ''}$2`);
             newParams.push(queryParams[paramName]);
             }
             });*/
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
                    let res: IDatabaseResult<T> = {
                        errorCode: dbResult.errorCode,
                        errorMessage: dbResult.errorMessage,
                        data: dbResult.data && dbResult.data.length > 0 && dbResult.data[0]
                    };
                    resolve(res);
                });
            }
            catch (e) {
                resolve({
                    errorCode: ErrorCodeEnum.DataBaseQueryError,
                    errorMessage: JSON.stringify(e),
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

    async queryValueAsync<T>(query: IDbQuery): Promise<IDatabaseResult<T>> {
        return new Promise<IDatabaseResult<any>>((resolve) => {
            try {
                this.query(query, (dbResult: IDatabaseResult<any[]>) => {
                    let res: IDatabaseResult<T> = {
                        errorCode: dbResult.errorCode,
                        errorMessage: dbResult.errorMessage,
                        data: dbResult.data && dbResult.data.length > 0 && dbResult.data[0][Object.keys(dbResult.data[0])[0]]
                    };
                    resolve(res);
                });
            }
            catch (e) {
                resolve({
                    errorCode: ErrorCodeEnum.DataBaseQueryError,
                    errorMessage: JSON.stringify(e),
                    data: undefined
                })
            }
        });
    }

    private query<T>(query: IDbQuery, doneCallback: (result: IDatabaseResult<Array<T>>) => void) {
        let pgQuery = PostgreEngine.transformQuery(query);
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