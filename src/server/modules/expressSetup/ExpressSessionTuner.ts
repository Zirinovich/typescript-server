import {Express} from "express-serve-static-core";
import session = require("express-session");

export class ExpressSessionTuner {
    static Setup(app: Express) {
        app.use(session({
            secret: 'yaouyahanSecretWord',
            resave: false,
            saveUninitialized: false
        }));
    }
}
