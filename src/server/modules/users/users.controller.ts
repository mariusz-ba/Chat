import { Application, Router, Request, Response } from 'express';
import { IController } from '../../interfaces/controller.interface';
import { catchExceptions } from '../../middleware/exceptions';
import UsersService from './users.service';
import User from './users.model';

import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { jwtSecret } from '../../config';

class UsersController implements IController {
  private _route: string;
  private _router: Router = Router();

  /**
   * Create new users controller
   * @param route path that controller will be mounted to
   */
  constructor(route: string) {
    this._route = route;
    this.configure();
  }

  /**
   * Configure router routes
   */
  private configure() {

    this._router.get(
      '/', 
      catchExceptions(async (req: Request, res: Response) => {
        const users = await UsersService.getUsers();
        res.status(200).json(users);
      })
    )

    this._router.post(
      '/auth',
      catchExceptions(async (req: Request, res: Response) => {
        const { identifier, password } = req.body;
        const user = await User.findOne({
          $or: [
            { 'username': identifier },
            { 'email': identifier }
          ]
        })
        if(user) {
          if(bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({
              _id: user._id
            }, jwtSecret);
            res.status(200).json({ token });
          } else {
            res.status(401).json({ errors: { form: 'Invalid credentials' }});
          }
        } else {
          res.status(401).json({ errors: { form: 'Invalid credentials' }});
        }
      })
    )

    this._router.get(
      '/:id', 
      catchExceptions(async (req: Request, res: Response) => {
        const user = await UsersService.getUserById(req.params.id);
        res.status(200).json(user);
      })
    )

    this._router.post(
      '/', 
      catchExceptions(async (req: Request, res: Response) => {
        const user = new User(req.body);
        const savedUser = await UsersService.saveUser(user);
        res.status(200).json(savedUser);
      })
    )

  }

  get route(): string {
    return this._route;
  }

  get router(): Router {
    return this._router;
  }
}

export default UsersController;