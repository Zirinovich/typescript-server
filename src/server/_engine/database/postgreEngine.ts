import {Pool, QueryConfig} from 'pg';

const config = {
    user: 'postgres', //env var: PGUSER
    database: 'altlan', //env var: PGDATABASE
    password: 'qwe123@#', //env var: PGPASSWORD
    host: 'db1.dev.altlan.ru', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 20, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

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