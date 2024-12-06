import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import * as http from 'http';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import {CommonRoutesConfig} from './routes/common/common.routes.config';
import {UsersRoutes} from './routes/users/users.routes.config';
import {PropertyRoutes} from './routes/property/property.routes.config';
import debug from 'debug';
//import bodyParser from 'body-parser';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

const dbPort = Number(process.env.DB_PORT) || 34567;
const dbUri = '';
const dbName = 'testing';

// here we are adding middleware to parse all incoming requests as JSON
app.use(express.json());

// here we are adding middleware to allow cross-origin requests
app.use(cors());

//app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({all: true})
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
//routes.push(new UsersRoutes(app));
//routes.push(new PropertyRoutes(app));

// this is a simple route to make sure everything is working properly
const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage);
});

export function run(dbUri: string, dbName: string) {
  server.listen(port, () => {
    //if (dbPort) {
    //  dbUri = 'mongodb://localhost:' + dbPort;
    //  console.log('DB_PORT:', dbPort, dbUri);
    //}
    routes.push(new PropertyRoutes(app, dbUri, dbName));
    routes.forEach((route: CommonRoutesConfig) => {
      debugLog(`Routes configured for ${route.getName()}`);
    });
    // our only exception to avoiding console.log(), because we
    // always want to know when the server is done starting up
    console.log(runningMessage);
  });
}

// run(dbUri, dbName);
