import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes() {
    this.app
      .route('/users')
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send('\n\nList of users\n\n');
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send('\n\nPost to users\n\n');
      });

    // this.app.route(`/users/:userId`)
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
          .send(`\n\nGET requested for id ${req.params.userId}\n\n`);
      })
      .post((req: express.Request, res: express.Response) => {
        // req.params - hold query string params
        // req.body - holds data
        console.log(req.body);
        res
          .status(200)
          .send(`\n\nPost requested for id ${req.params.userId}\n\n`);
      })
      .put((req: express.Request, res: express.Response) => {
        res
          .status(200)
          .send(`\n\nPUT requested for id ${req.params.userId}\n\n`);
      })
      .patch((req: express.Request, res: express.Response) => {
        res
          .status(200)
          .send(`\n\nPATCH requested for id ${req.params.userId}\n\n`);
      })
      .delete((req: express.Request, res: express.Response) => {
        res
          .status(200)
          .send(`\n\nDELETE requested for id ${req.params.userId}\n\n`);
      });

    //console.log(this.app.route);

    return this.app;
  }
}
