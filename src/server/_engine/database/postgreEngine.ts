import {Pool, QueryConfig} from 'pg';
var config = require('./../../../../config/database');

export class PostgreEngine {
    static pool = new Pool(config);

    static executeQuery(query: QueryConfig, doneCallback: (error, result)=>any) {

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
}