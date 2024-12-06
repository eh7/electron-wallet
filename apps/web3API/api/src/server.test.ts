//import {start, stop} from './index';
import {run} from './server';

import {MongoMemoryServer} from 'mongodb-memory-server';

import * as request from 'supertest';

//mongoose.set('debug', false);

// eslint-disable-next-line
let mongo: any;

// eslint-disable-next-line
let database: any;
let mongoUri: string;
//let testProperty: IProperty;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  mongoUri = await mongo.getUri();
  console.log('start express', await run(mongoUri, 'testing'));
  // await mongoose.connect(mongoUri);
  // database = new Database('testing', mongoUri);
});

afterAll(async () => {
  await mongo.stop();
  //await mongoose.connection.close();
  // stop();
});

describe('testing server file', () => {
  test('empty string should result in zero', () => {
    console.log(mongoUri);
    //console.log(run);
    //expect(add('')).toBe(0);
    // run();
  });
});
