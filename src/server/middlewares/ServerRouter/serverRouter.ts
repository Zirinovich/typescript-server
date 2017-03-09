import * as express from "express";
import * as path from "path";
import {apiRouter} from "./apiRouter";
const favicon = require('serve-favicon');

// NOTE: Порядок маршрутов важен!
export const serverRouter = express.Router();

serverRouter.use(favicon(path.join(__dirname, 'public/favicon.ico')));
serverRouter.use("/public", express.static(path.join(__dirname, "public")));
serverRouter.use("/api", apiRouter);