import {Database} from './';
import {IProperty} from './models/property';
import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';

mongoose.set('debug', false);

// eslint-disable-next-line
let mongo: any;

// eslint-disable-next-line
let database: any;
let mongoUri;
let testProperty: IProperty;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  mongoUri = await mongo.getUri();
  // await mongoose.connect(mongoUri);
  database = new Database('testing', mongoUri);
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

describe('testing database service', () => {
  //async() {
  //  const mongod = await MongoMemoryServer.create();
  //  const uri = mongod.getUri();
  //  console.log('uri', uri);
  //  await mongod.stop();
  //}
  test('database getName function should be `testing`', () => {
    // const database = new Database('testing');
    // console.log('ssss', Database, database);
    expect(database.getName()).toBe('testing');
  });

  test('database createProperty function unit test', async () => {
    const property = {
      name: 'straloch lodge',
      description: '3 bedroom lodge',
      location: '56.812617,-3.461389',
      currentRate: '85.00',
    };
    expect(testProperty).toBeUndefined();
    testProperty = await database.createProperty(property);
    expect(testProperty).toBeDefined();
  });

  test('database readProperty function unit test "no match"', async () => {
    let testReadProperty = null;
    const notValidId = 'eeeeec3c6f5ca705551eeeee';
    testReadProperty = await database.readProperty(notValidId);
    expect(testReadProperty === null).toBeTruthy();
  });

  test('database readProperty function unit test', async () => {
    let testReadProperty = null;
    testReadProperty = await database.readProperty(testProperty._id.toString());
    expect(testReadProperty !== null).toBeTruthy();
    expect(testReadProperty._id !== null).toBeTruthy();
  });

  test('database updateProperty function unit test - no object', async () => {
    // TODO: make sure on update of invalid id not insert
    const notValidId = 'eeeeec3c6f5ca705551eeeee';
    const property = {
      name: 'straloch lodge update',
      description: '4 bedroom lodge',
      location: '56.812617,-3.461389',
      currentRate: '85.00',
    };
    const testReadProperty = await database.updateProperty(
      notValidId,
      property
    );
    //console.log('(TODO confirm this does not create a new property record) test (updateProperty - wrong _id):', testReadProperty);
    //console.log('test (updateProperty - wrong _id):', testReadProperty.lastErrorObject.updatedExisting);
    expect(testReadProperty.lastErrorObject.updatedExisting).toBeFalsy();
    //expect(testReadProperty.value.name == property.name).toBeTruthy();
    const newPropertyTest = await database.readProperty(notValidId);
    expect(newPropertyTest === null).toBeTruthy();
    //console.log('notValidId should not exist', newPropertyTest);
  });

  test('database updateProperty function unit test', async () => {
    const property = {
      name: 'straloch lodge update 999',
      description: '4 bedroom lodge',
      location: '56.812617,-3.461389',
      currentRate: '85.00',
    };
    const testReadProperty = await database.updateProperty(
      testProperty._id.toString(),
      property
    );
    //console.log('test (updateProperty):', testReadProperty);
    expect(testReadProperty.value.name === property.name).toBeTruthy();
  });

  test('database updateProperty function unit test - booking', async () => {
    const property = {
      name: 'straloch lodge update 888',
      description: '4 bedroom lodge',
      location: '56.812617,-3.461389',
      currentRate: '85.00',
      bookings: [
        {
          from: '2023-04-18',
          to: '2023-04-20',
          baseRate: '85.00',
          rate: '1',
        },
      ],
    };
    const testReadProperty = await database.updateProperty(
      testProperty._id.toString(),
      property
    );
    //console.log('test (updateProperty):', testReadProperty);
    //console.log('test (updateProperty):', testReadProperty.value.bookings[0].from);
    //console.log('test (updateProperty):', property.bookings[0].from);
    expect(testReadProperty.value.name === property.name).toBeTruthy();
    expect(
      testReadProperty.value.bookings[0].from === property.bookings[0].from
    ).toBeTruthy();
  });

  test('database deleteProperty function unit test', async () => {
    //const deletedProperty = await database.deleteProperty(
    await database.deleteProperty(testProperty._id.toString());

    // now check it is deleted
    const deletedPropertyCheck = await database.readProperty(
      testProperty._id.toString()
    );
    expect(deletedPropertyCheck === null).toBeTruthy();
  });

  test('database deleteProperty function unit test - notValidId', async () => {
    // check a _id that does not exit throws error
    const notValidId = 'e2eeec3c6f5ca705551eeeee';
    const deletedProperty1 = await database.deleteProperty(notValidId);
    expect(deletedProperty1.value === null).toBeTruthy();
    //console.log('(TODO check that this did not exist before delete) deletedProperty1:', deletedProperty1);
  });

  test('database searchProperty function unit test', async () => {
    const property0 = {
      name: 'straloch lodge',
      description: '3 bedroom lodge',
      location: '56.812617,-3.461389',
      currentRate: '85.00',
    };
    const property1 = {
      name: 'ski lodge',
      description: '2 bedroom lodge',
      location: '56.812617,-3.461389',
      currentRate: '75.00',
    };
    const testProperty0 = await database.createProperty(property0);
    const testProperty1 = await database.createProperty(property1);

    // check you find property with 'ski' in the name
    const searchObject = {
      name: /ski/i,
    };
    const ProtSearchProperty = await database.searchProperty(searchObject);
    expect(ProtSearchProperty.name === property1.name).toBeTruthy();

    // check you find 1 properties with 'lodge' in the name using searchProperty function
    const searchObject2 = {
      name: /lodge/i,
    };
    const ProtSearchProperty2 = await database.searchProperty(searchObject2);
    //console.log(ProtSearchProperty2);
    expect(ProtSearchProperty2.name === property0.name).toBeTruthy();

    await database.deleteProperty(testProperty0._id.toString());
    await database.deleteProperty(testProperty1._id.toString());
  });

  test('database searchProperties function unit test', async () => {
    const property0 = {
      name: 'straloch lodge',
      description: '3 bedroom lodge',
      location: '56.812617,-3.461389',
      currentRate: '85.00',
    };
    const property1 = {
      name: 'ski lodge',
      description: '2 bedroom lodge',
      location: '56.812617,-3.461389',
      currentRate: '75.00',
    };
    const testProperty0 = await database.createProperty(property0);
    const testProperty1 = await database.createProperty(property1);

    // check you find 2 properties with 'lodge' in the name
    const searchObject1 = {
      name: /lodge/i,
    };
    const ProtSearchProperty1 = await database.searchProperties(searchObject1);
    //console.log(ProtSearchProperty1);
    expect(ProtSearchProperty1[0].name === property0.name).toBeTruthy();
    expect(ProtSearchProperty1[1].name === property1.name).toBeTruthy();

    await database.deleteProperty(testProperty0._id.toString());
    await database.deleteProperty(testProperty1._id.toString());
  });
});
