import express from 'express';

export interface ICommonRoutesConfig {
  app: express.Application;
  name: string;

  getName(): string;
  configureRoutes(): express.Application;
}

export abstract class CommonRoutesConfig {
  app: express.Application;
  name: string;

  constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
    this.configureRoutes();
  }

  getName() {
    return this.name;
  }

  abstract configureRoutes(): express.Application;
}
