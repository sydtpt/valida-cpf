import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import 'dotenv/config';

class App {
  public app: express.Application;
  public port;
  constructor(controllers, port) {
    this.port = port;
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  //inicializar middlewares aqui.
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }
 

  //recebe a lista de controllers que devem ser iniciados pelo server.ts
  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      //guarda informação da hora de inicialiazação
      this.app.locals.startedAt = new Date();

      //inicia o contador de chamadas para consulta de cpfs
      this.app.locals.total_consult = 0;
      console.log(`App listening on the port ${this.port}`);
    });
  }

  // database: nome do container rodando o mongodb
  private connectToTheDatabase() {
    mongoose.connect(`mongodb://database/cpf`);
  }
}
 
export default App;