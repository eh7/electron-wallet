// require('dotenv').config();
import dotenv from 'dotenv';

dotenv.config();

// const mms = require('mongodb-memory-server');
//import {mms} from 'mongodb-memory-server';

//
import {MongoMemoryServer} from 'mongodb-memory-server';
import Property, {IProperty} from './services/database/models/property';
import mongoose from 'mongoose';

const port = Number(process.env['DB_PORT']) || 34567;
const dbName = process.env.DB_NAME || 'dev';

const mongo_options = {
  instance: {
    dbName,
    port,
  },
};

const testData = require('../tests/mongodb.json');

async function setupDBData() {
  for (let i = 0; i < testData.length; i++) {
    const propertyData = testData[i];
    const property = new Property(propertyData);
    await property.save();
    //console.log(propertyData.name);
    //console.log('findOne:', await Property.findOne({name: propertyData.name}));
  }
  const testDataInserted = await Property.find({});
  console.log(testDataInserted.length);
  /*
  await testData.forEach(async (_property: IProperty) => {
    //console.log(_property.name);
    const property = new Property(_property);
    await property.save();
    //console.log('findOne:', await Property.findOne({name: _property.name}));
  });
  */
}

async function start() {
  console.log('starting');
  const mongod = await MongoMemoryServer.create(mongo_options);
  const uri = mongod.getUri();
  await mongoose.connect(uri);
  await setupDBData();
  console.log(uri);
}

start();
