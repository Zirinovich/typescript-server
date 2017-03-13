import {Express} from "express-serve-static-core";
const compression = require('compression');
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

export class ExpressCommonTuner {
    static Setup(app: Express) {
        app.use(compression());
        app.use(cookieParser());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
    }
}
