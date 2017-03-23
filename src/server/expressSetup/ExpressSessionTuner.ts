import {Express} from "express-serve-static-core";
import session = require("express-session");

export class ExpressSessionTuner {
    static Setup(app: Express) {
        let MemoryStore = require('session-memory-store')(session);
        app.use(session({
            name: 'x-session',
            secret: 'yaouyahanSecretWord',
            resave: false,
            saveUninitialized: false,
            store: new MemoryStore({expires: 60 * 60 * 4})
        }));
    }
}
