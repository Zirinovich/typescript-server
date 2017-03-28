import {Pool, QueryConfig} from 'pg';

const config = {
    user: 'postgres', //env var: PGUSER
    database: 'typeserver', //env var: PGDATABASE
    password: 'ss', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

export class PgClient {
    static pool = new Pool(config);

    static executeQuery(query: QueryConfig, doneCallback: (error, result)=>any) {

        PgClient.pool.connect()
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

        /*       PgClient.pool.connect((connectionError, client, done) => {
            if (connectionError) {
                return doneCallback(connectionError, null);
            }
            client.query(query, (queryError, result) => {
                done(queryError, null);
                if (queryError) {
                    return doneCallback(queryError, null);
                }
                doneCallback(null, result);
            })
        })*/
    }
}