import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as path from 'path';
import * as mongoose from 'mongoose';
import { Router } from './modules/module';

class App {
  
  public app: express.Application;
  public router: Router = new Router();

  constructor() {
    this.app = express();
    this.config();
    this.router.routes(this.app);
    this.handleErrors();
  }

  private config(): void {
    // Configure some security options
    this.app.disable('x-powered-by');
    this.app.use(helmet());
    
    // Configure middleware
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.static(path.join(__dirname, '../../dist')));

    // Configure database connection
    mongoose.connect('mongodb://127.0.0.1:27017/chat', {
      useNewUrlParser: true
    })
  }
  
  private handleErrors() {
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      const result = { error: err.message };

      if(this.app.get('env') === 'production')
        result.error = 'Unable to handle the request';

      res.status(500).json(result);
    })
  }
}

export default new App().app;