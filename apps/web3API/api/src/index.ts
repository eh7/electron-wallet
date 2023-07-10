import dotenv from 'dotenv';
dotenv.config();

import {run} from './server';

const dbPort = Number(process.env.DB_PORT) || 34567;
const dbName = process.env.DB_NAME || 'dev';
const dbUri = 'mongodb://localhost:' + dbPort; // + '/' + dbName;
console.log('DB_PORT:', dbPort, dbUri);

run(dbUri, dbName);
