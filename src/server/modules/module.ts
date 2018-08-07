import { Application } from 'express';
import { IController } from '../interfaces/controller.interface';

// Controllers
import UsersController from './users/users.controller';

export class Router {

  private controllers: Array<IController> = [
    new UsersController('/api/users'),
    // ... other controllers
  ]

  /**
   * Apply controllers to express app
   * @param {Application} app Application that controllers will be applied to 
   */
  public routes(app: Application): void {
    // Configure controllers
    this.controllers.forEach(controller => {
      app.use(controller.route, controller.router);
    })
  }
}