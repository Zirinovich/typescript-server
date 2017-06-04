import {Express} from "express-serve-static-core";
import session = require("express-session");
const redis = require("connect-redis");
const config = require("../../../../../config/redis");

export class ExpressSessionTuner {
    static Setup(app: Express) {
        let MemoryStore = require('session-memory-store')(session);
        const RedisStore = redis(session);
        // let client = createClient();
        app.use(session(config(RedisStore)));
    }
}
