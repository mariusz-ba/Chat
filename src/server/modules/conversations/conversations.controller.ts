import { Router, Response } from 'express';
import { IController } from '../../interfaces/controller.interface';
import { catchExceptions } from '../../middleware/exceptions';
import ConversationsService from './conversations.service';
import authenticate from '../../middleware/authenticate';

class ConversationsController implements IController {
  private _route: string;
  private _router: Router = Router();

  constructor(route: string) {
    this._route = route;
    this.configure();
  }

  private configure() {
    this._router.get(
      '/',
      authenticate,
      catchExceptions(async (req: any, res: Response) => {
        const conv = await ConversationsService.getConversationsForUser(req.user._id);
        res.status(200).json(conv);
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

export default ConversationsController;