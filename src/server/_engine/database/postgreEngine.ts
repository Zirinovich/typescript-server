import {Pool, QueryConfig} from 'pg';
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
var config = require('./../../../../config/database');

interface IDatabaseResult {
    ErrorCode: ErrorCodeEnum,
    ErrorMessage: string,
    Data: any
}

interface IDbQuery{
    name?: string;
    text: string;
    values?: any;
}

export class PostgreEngine {
    static pool = new Pool(config);

    static executeQuery(query: IDbQuery, doneCallback: (error, result)=>any) {

        let queryText = query.text;
        let queryParams = query.values;

        Object.keys(queryParams).forEach((propName, i)=>{
            queryText = queryText.replace(new RegExp(`\@${propName}`,'g'))
        });


        for(let key in queryParams){

        }

        PostgreEngine.pool.connect()
            .then(client => {
                client.query(query)
                    .then(result => {
                        doneCallback(null, result);
                    })
                    .catch(queryError => {
                        doneCallback(queryError, null);
                    })
            })
            .catch(connectionError => {
                doneCallback(connectionError, null);
            });
    }

    static async executeQueryAsync(query: QueryConfig) {
        try {
            return {
                ErrorCode: null,
                ErrorMessage: null,
                Data: await (await PostgreEngine.pool.connect()).query(query)
            }
        }
        catch (e) {
            return {
                ErrorCode: ErrorCodeEnum.DataBaseSystemError,
                ErrorMessage: e.data.message,
                Data: null
            }
        }

    }
}