var config = function (RedisStore) {
    return {
        name: 'x-session',
        secret: 'yaouyahanSecretWord',
        resave: false,
        saveUninitialized: false,
        store: new RedisStore({
            host: 'localhost',
            port: 6379
        })
    }
};

module.exports = config;
