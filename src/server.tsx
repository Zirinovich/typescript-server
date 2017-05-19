const appConfig = require('../config/main');
const Chalk = require('chalk');

import {appApi} from "./server/registration";
import {appRenderOnServer} from "./renderOnServer";
import * as express from 'express';

const app = express();
app.use(appApi);
app.use(appRenderOnServer);
app.listen(appConfig.port, appConfig.host, (err) => {
    if (err) {
        console.error(Chalk.bgRed(err));
    } else {
        console.info(Chalk.black.bgGreen(
            `\n\n凸ಠ益ಠ)凸  Listening at http://${appConfig.host}:${appConfig.port}\n`,
        ));
    }
});
