import https from 'https';
import axios from 'axios';

import express from 'express';
import * as http from 'http';
import cors from 'cors';

import {CommonRoutesConfig} from '../common/common.routes.config';
//import {UsersRoutes} from '../users/users.routes.config';
import {
  PropertyRoutes,
  IPropertyRoutes,
} from '../property/property.routes.config';

import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];

app.use(express.json());
app.use(cors());

//routes.push(new UsersRoutes(app));
//routes.push(new PropertyRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;

// eslint-disable-next-line
let mongo: any;
let database;
let mongoUri: string;
let dbName: string;
let commonRoutes;
let propertyRoutes;
//let propertyRoutes: IPropertyRoutes;

function getRequestAxios() {
  axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      const headerDate =
        res.headers && res.headers.date ? res.headers.date : 'no response date';
      console.log('Status Code:', res.status);
      console.log('Date in Response header:', headerDate);

      const users = res.data;

      //for(user of users) {
      //  console.log(`Got user with id: ${user.id}, name: ${user.name}`);
      //}
    })
    .catch(err => {
      console.log('Error: ', err.message);
    });
}

async function putRequestPropertyWithId(_id: string, _updateProperty: object) {
  //console.log('_id:', _id);
  return await axios.put(
    `http://localhost:3000/property/${_id}`,
    _updateProperty
  );
}

async function getRequestPropertyWithId(_id: string) {
  //console.log('getRequestPropertyWithId', _id);
  return await axios.get(`http://localhost:3000/property/${_id}`);
}

async function deleteRequestPropertyWithId(_property_id: string) {
  return await axios.delete(`http://localhost:3000/property/${_property_id}`);
}

async function getRequestPropertiesId(_id: string) {
  const returnData = await axios.get(`http://localhost:3000/property/${_id}`);
}

async function getRequestPropertiesNameFilter(name: string) {
  const data = {name: ''};
  data.name = name;

  // TODO JSON.stringify() dataRegex string ???
  //const dataRegex = {'name': {'$regex': name}};
  //console.log('dataRegex:', dataRegex);
  //const returnDataRegex = await axios.post('http://localhost:3000/properties/search', dataRegex);
  //console.log('returnDataRegex:', returnDataRegex);
  //return(returnDataRegex.data);

  console.log('aaaaaaaaaaaaaaaaa', name, data);
  const returnData = await axios.post(
    'http://localhost:3000/properties/search',
    data
  );
  return returnData.data;
}

async function getRequestProperties() {
  const returnData = await axios.get('http://localhost:3000/properties');
  return returnData.data;
}

function getRequestProperty(filter: object) {
  //{name: 'straloch lodge'};
  console.log('sddddddddddddddd', filter);
  axios
    .get('http://localhost:3000/property/', filter)
    .then(res => {
      console.log(`Status: ${res.status}`);
      console.log('Body: ', res.data);
    })
    .catch(err => {
      console.error(err);
    });
}

async function postRequestWithData(property: object) {
  await axios.post('http://localhost:3000/property', property);
}

function getRequestWithHeader() {
  console.log('-------------------------> setup headers');
  const config = {
    headers: {
      token: 'xyxTokenCodeHere',
    },
  };
  http
    .get('http://localhost:3000/property', config, res => {
      const data: Buffer[] = [];
      const headerDate =
        res.headers && res.headers.date ? res.headers.date : 'no response date';
      //console.log('Status Code:', res.statusCode);
      //console.log('Date in Response header:', headerDate);

      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
        //console.log('Response ended: ');
        //console.log('data:', '\n\nGet property endpoint: GET /property -- testing route\n\n', Buffer.concat(data).toString());
        expect(
          Buffer.concat(data).toString() ===
            '\n\nGet property endpoint: GET /property -- testing route\n\n'
        ).toBeTruthy();
        // const users = JSON.parse(Buffer.concat(data).toString());
      });
    })
    .on('error', err => {
      console.log('Error: ', err.message);
    });
}

function getRequest() {
  //https
  //  .get('https://localhost:3000/property', res => {
  http
    .get('http://localhost:3000/property', res => {
      const data: Buffer[] = [];
      const headerDate =
        res.headers && res.headers.date ? res.headers.date : 'no response date';
      //console.log('Status Code:', res.statusCode);
      //console.log('Date in Response header:', headerDate);

      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
        //console.log('Response ended: ');
        //console.log('data:', '\n\nGet property endpoint: GET /property -- testing route\n\n', Buffer.concat(data).toString());
        expect(
          Buffer.concat(data).toString() ===
            '\n\nGet property endpoint: GET /property -- testing route\n\n'
        ).toBeTruthy();
        // const users = JSON.parse(Buffer.concat(data).toString());
      });
    })
    .on('error', err => {
      console.log('Error: ', err.message);
    });
}

beforeAll(async () => {
  server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
      console.log(`Routes configured for ${route.getName()}`);
    });
    // our only exception to avoiding console.log(), because we
    // always want to know when the server is done starting up
    // console.log(runningMessage);
  });

  mongo = await MongoMemoryServer.create();
  mongoUri = await mongo.getUri();
  dbName = 'testing';
  // commonRoutes = new CommonRoutesConfig(app, 'testing');
  // userRoutes = new UsersRoutes(app);
  // propertyRoutes = new PropertyRoutes(app, mongoUri);
  // console.log(app, mongoUri, dbName);

  propertyRoutes = new PropertyRoutes(app, mongoUri, dbName);
  routes.push(propertyRoutes);
  /*
  propertyRoutes.waitForDBConnection(mongoUri);
  */
  // await propertyRoutes.database.mongoose.connect(mongoUri);
  // console.log('aaaaaaaaaaaaaaaaaa', propertyRoutes.database.mongoose.close);
  //routes.push(new PropertyRoutes(app, mongoUri, dbName));

  //console.log(app);
  // await mongoose.connect(mongoUri);
  // database = new Database('testing', mongoUri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
  //await propertyRoutes.database.mongoose.connection.close();
  server.close();
  //console.log('CLOSE SERVER ------------------------------');
});

describe('test property routes', () => {
  test('test property route `GET /property` (with header and no body JSON DATA)', () => {
    getRequestWithHeader();
  });

  test('test property route `GET /property` (no body JSON DATA)', () => {
    // curl --request POST 'localhost:3000/users/12' -H "Content-Type: application/json" --data '{"a":"a"}'
    getRequest();
  });

  test('test property route `POST /property` ceate property (with body JSON DATA)', async () => {
    //console.log(
    //  'test property route `POST /property` ceate property (with body JSON DATA)'
    //);

    // add test property 0
    const property0 = {
      name: 'straloch lodge',
      description: '3 bedroom lodge',
      location: '56.812617,-3.461389',
      currentRate: '85.00',
    };
    await postRequestWithData(property0);

    // add test property 1
    const property1 = {
      name: 'cairnwell lodge',
      description: '2 bedroom lodge',
      location: '56.812617,-3.461389',
      currentRate: '85.00',
    };
    await postRequestWithData(property1);
  });

  test('test property route `GET /properties` read all properties', async () => {
    const properties = await getRequestProperties();
    expect(properties.length === 2).toBeTruthy();
    expect(properties[1].name === 'cairnwell lodge').toBeTruthy();
    // console.log(properties[1].name, 'cairnwell lodge');
  });

  test('test property route `POST /properties/search req.body=searchFilter` search for all properties with pattern', async () => {
    const nameFilter = 'lodge';
    const properties = await getRequestPropertiesNameFilter(nameFilter);
    console.log('in test:', properties);

    const nameFilter1 = 'straloch';
    const properties1 = await getRequestPropertiesNameFilter(nameFilter1);
    //const properties1 = await getRequestPropertiesNameFilter(dataRegex);
    console.log('in test 1:', properties1);
  });

  test('test property route `GET /property/:id` read property', async () => {
    const properties = await getRequestProperties();
    const property = await getRequestPropertyWithId(properties[0]._id);
    //console.log(property.data._id, properties[0]._id);
    expect(property.data._id === properties[0]._id).toBeTruthy();
    expect(property.data.name === properties[0].name).toBeTruthy();
    //console.log(property.data, properties[0]);
  });

  test('test property route `PUT /property/:id` update property (with body JSON DATA)', async () => {
    const propertyUpdate = {
      name: 'cairnwell lodge 1',
      currentRate: '87.00',
    };
    const properties = await getRequestProperties();
    console.log(properties[1], propertyUpdate);
    const updatedProperty = await putRequestPropertyWithId(
      properties[1]._id,
      propertyUpdate
    );
    console.log('updatedProperty:', updatedProperty.data);
    expect(updatedProperty.data.value._id === properties[1]._id).toBeTruthy();
    expect(
      updatedProperty.data.value.name === propertyUpdate.name
    ).toBeTruthy();
    expect(
      updatedProperty.data.value.currentRate === propertyUpdate.currentRate
    ).toBeTruthy();
    //expect(updatedProperty.data.value.updatedAt !== propertyUpdate.updatedAt).toBeTruthy();
    const lastUpdate = new Date(updatedProperty.data.value.updatedAt);
    const firstUpdate = new Date(properties[1].updatedAt);
    expect(lastUpdate > firstUpdate).toBeTruthy();
    //console.log(propertyUpdate);
  });

  test.skip('test property route `GET /property/:filter` read property', () => {
    const property = getRequestProperty({name: 'straloch lodge'});
  });

  test('test property route `DELETE /property/:id` delete property (with matching :id)', async () => {
    const properties = await getRequestProperties();
    const deletedProperty = await deleteRequestPropertyWithId(
      properties[1]._id
    );
    const properties1 = await getRequestProperties();
    //console.log(deletedProperty.data, deletedProperty.data.value, properties[1], properties1.length);
    expect(deletedProperty.data.ok === 1).toBeTruthy();
    expect(deletedProperty.data._id === deletedProperty.data.value._id);
    //console.log(deletedProperty.data, deletedProperty.data.value, properties[1]);
    expect(properties1.length === 1).toBeTruthy();
  });
});
