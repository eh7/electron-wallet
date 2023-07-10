import {
  CommonRoutesConfig,
  ICommonRoutesConfig,
} from '../common/common.routes.config';
import express from 'express';
import {Database, IDatabase} from '../../services/database';

export interface IPropertyRoutes {
  database: IDatabase;
  db: string;
  dbUri: string;

  getRequestProperty(filter: object): void;
  closeRoutes(): void;
  asyncConfigureRoutes(): void;
  configureRoutes(): void;
  //CommonRoutesConfig(): void;
}

export class PropertyRoutes extends CommonRoutesConfig {
  //database: any;
  database: IDatabase;
  db: string;
  dbUri: string;

  constructor(app: express.Application, dbUri: string, db: string) {
    super(app, 'PropertyRoutes');
    this.database = new Database(db, dbUri);
    this.db = db;
    this.dbUri = dbUri;
    //this.closeRoutes();
  }

  /*
  async waitForDBConnection() {
    await this.database.connectDb(this.dbUri);
  }
  */

  getRequestProperty(filter: object) {
    // {name: 'straloch lodge'});
    console.log('aaaaaaaaassssssssssssss', filter);
    this.database.getProperty();
  }

  async closeRoutes() {
    //console.log('aaaaaaaaaaaaaaaaaaaaaa', 'closeRoute', this.app);
    console.log('aaaaaaaaaaaaaaaaaaaaaa', 'closeRoute');
    await this.database.closeDatabase();
    //await this.database.mongoose.connection.close();
  }

  async asyncConfigureRoutes() {
    this.app.route('/property');
  }

  configureRoutes() {
    this.app
      .route('/property')
      // 'GET /property' testing only
      .get((req: express.Request, res: express.Response) => {
        res
          .status(200)
          .send(
            '\n\nGet property endpoint: GET /property -- testing route\n\n'
          );
      })
      // 'Post /property' create a new property (with body JSON DATA)
      .post(async (req: express.Request, res: express.Response) => {
        const property = req.body;

        const newProperty = await this.database.createProperty(req.body);

        res.status(200).send(JSON.stringify(newProperty));
        //.send('\n\nPost to property endpoint: to create a new property\n\n' + newProperty + '\n\n');
      });

    this.app
      .route('/property/:id')
      // `PUT /property/:id` update property (with body JSON DATA)
      .put(async (req: express.Request, res: express.Response) => {
        const property = await this.database.updateProperty(
          req.params.id,
          req.body
        );
        res.status(200).send(JSON.stringify(property));
      })
      // `GET /property/:id` read property
      .get(async (req: express.Request, res: express.Response) => {
        const property = await this.database.readProperty(req.params.id);
        //console.log('aaaaaaaaaaaaaaaaaa id:', req.params.id, property);
        res.status(200).send(JSON.stringify(property));
        //res
        //  .status(200)
        //  .send('\n\nGet to property endpoint: to read a current property\n\n');
      })
      // `DELETE /property/:id` delete property (with matching :id)
      .delete(async (req: express.Request, res: express.Response) => {
        const deletedProperty = await this.database.deleteProperty(
          req.params.id
        );
        res.status(200).send(JSON.stringify(deletedProperty));
        /*
        res
          .status(200)
          .send(
            '\n\nDelete to property endpoint: to delete a current property\n\n'
          );
        */
      });

    this.app
      .route('/properties')
      // `GET /properties` read all properties
      .get(async (req: express.Request, res: express.Response) => {
        //console.log('================ GET /properties');
        const properties = await this.database.getProperty();
        //console.log('sssssssssssssssssssss', properties);
        res.status(200).send(JSON.stringify(properties));
      });

    this.app
      .route('/properties/search')
      .post(async (req: express.Request, res: express.Response) => {
        const filter = req.body;
        // console.log('DDDDDDDDDDD /properties/search req.body.name', filter.name);
        // eslint-disable-next-line
        const data = {name: {'$regex': filter.name}};
        //const data = {'name': '/' + filter.name + '/'};
        //const data = JSON.parse(filter);
        console.log(data);
        const result = await this.database.getPropertySearch(data);
        console.log('result', result);

        res.status(200).send(result);
        //res.status(200).send('\n\nPost to search resource\n\n');
      });

    this.app
      .route('/properties/:pattern')
      // `GET /properties/:pattern` search for all properties with pattern
      .get((req: express.Request, res: express.Response) => {
        res
          .status(200)
          .send(
            '\n\nGet to properties/:pattern endpoint: to read a list of current properties\n\n'
          );
      });

    /*
    this.app
      .route('/users')
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send('\n\nList of users\n\n');
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send('\n\nPost to users\n\n');
      });

    this.app
      .route('/users/:userId')
      .all(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          // this middleware function runs before any request to /users/:userId
          // but it doesn't accomplish anything just yet---
          // it simply passes control to the next applicable function below using next()
          next();
        }
      )
      .get((req: express.Request, res: express.Response) => {
        res
          .status(200)
          .send('\n\nGET requested for id ${req.params.userId}\n\n');
      })
      .post((req: express.Request, res: express.Response) => {
        // req.params - hold query string params
        // req.body - holds data
        console.log(req.body);
        res
          .status(200)
          .send('\n\nPost requested for id ${req.params.userId}\n\n');
      })
      .put((req: express.Request, res: express.Response) => {
        res
          .status(200)
          .send('\n\nPUT requested for id ${req.params.userId}\n\n');
      })
      .patch((req: express.Request, res: express.Response) => {
        res
          .status(200)
          .send('\n\nPATCH requested for id ${req.params.userId}\n\n');
      })
      .delete((req: express.Request, res: express.Response) => {
        res
          .status(200)
          .send('\n\nDELETE requested for id ${req.params.userId}\n\n');
      });
    */

    // console.log(this.app.route);

    return this.app;
  }
}
