var config = {
    user: 'postgres', //env var: PGUSER
    database: 'altlan_site', //env var: PGDATABASE
    password: 'qwe123@#', //env var: PGPASSWORD
    host: 'db1.dev.altlan.ru', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 20, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

module.exports = config;