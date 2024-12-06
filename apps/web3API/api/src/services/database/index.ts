//// eslint-disable-next-line
//import express from 'express';

import mongoose from 'mongoose';
//import mongoose, {Error} from 'mongoose';
import Property, {IProperty} from './models/property';

mongoose.Promise = global.Promise;

mongoose.set('debug', false);

export interface IDatabase {
  name: string;
  mongoUri: string;
  mongoose: object;

  closeDatabase(): void;
  getProperty(): object;
  getPropertySearch(filter: object): object;
  createProperty(_property: IProperty): object;
  readProperty(_property_id: string): object;
  updateProperty(_property_id: string, _property: IProperty): object;
  deleteProperty(_property_id: string): object;
  searchProperty(searchData: object): object;
  searchProperties(searchData: object): object;
  getName(): string;
}

export class Database {
  //app: express.Application;
  name: string;
  //property: any;
  mongoUri: string;
  mongoose: object;

  constructor(name: string, mongoUri: string) {
    // this.app = app;
    this.name = name;
    this.mongoUri = mongoUri;

    mongoose.connect(mongoUri);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    this.mongoose = mongoose;
  }

  async closeDatabase() {
    await mongoose.connection.close();
  }

  async getProperty() {
    return await Property.find({});
  }

  async getPropertySearch(filter: object) {
    return await Property.find(filter);
  }

  async createProperty(_property: IProperty) {
    const property = new Property(_property);
    return await property.save();
  }

  async readProperty(_property_id: string) {
    return await Property.findOne({_id: _property_id});
  }

  async updateProperty(_property_id: string, _property: IProperty) {
    return await Property.findOneAndUpdate({_id: _property_id}, _property, {
      new: true,
      upsert: false,
      rawResult: true,
      setDefaultsOnInsert: true,
    });
    // {upsert: true, new: true, setDefaultsOnInsert: true}
  }

  async deleteProperty(_property_id: string) {
    return await Property.findOneAndRemove(
      {_id: _property_id},
      {rawResult: true}
    );
  }

  async searchProperty(searchData: object) {
    return await Property.findOne(searchData);
  }

  async searchProperties(searchData: object) {
    return await Property.find(searchData);
  }

  getName() {
    return this.name;
  }
}
