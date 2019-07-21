import * as express from 'express';
import CPF from './cpf.interface';
import cpfModel from './cpf.model';

class CPFController {
  public path = '/cpf';
  public router = express.Router();
  
  private posts: CPF[] = [
  ];

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get('/consulta', this.isBlocked);
    this.router.get(this.path, this.getAllBlocked);
    this.router.post(this.path, this.blockCpf);
    this.router.delete(`${this.path}/:cpf`, this.unblockCpf);
    // this.router.delete(`/reset`, this.resetDatabase);
  }

  private isBlocked = async (request: express.Request, response: express.Response) => {
    const cpf = request.query.cpf;
    request.app.locals.total_consult += 1;
    if(!this.isValid(cpf)){
      this.sendInvalidCpf(request, response, cpf);
      return;
    }
    const exist = await cpfModel.findOne({ cpf: cpf });
    if (exist) {
      response.send({ cpf: cpf, isBlocked: true, createdAt: exist.createdAt });
      return;
    }
    response.send({ cpf: cpf, isBlocked: false });
  }

  private getAllBlocked = async (request: express.Request, response: express.Response) => {
    const cpfs = await cpfModel.find({}, '-_id -__v -updatedAt');
    response.send({ items: cpfs });
  }

  private resetDatabase = async (request: express.Request, response: express.Response) => {
    const cpfs = await cpfModel.deleteMany({});
    response.send({ items: cpfs });
  }


  private blockCpf = async (request: express.Request, response: express.Response) => {
    const cpf: string = request.body.cpf;

    if(!cpf){
      response.status(400);
      response.send({
        message: 'cpf must be informed!'
      });
      return;
    }

    if(!cpf || !this.isValid(cpf)){
      this.sendInvalidCpf(request, response, cpf);
      return;
    }
    const exist = await cpfModel.findOne({ cpf: cpf });
    if (exist) {
      response.status(409);
      response.send({
        message: 'cpf already blocked!'
      });
      return;
    }
    const createdCpf = new cpfModel({cpf: cpf});
    const savedCpf = await createdCpf.save();
    response.status(201);
    response.send(savedCpf);
  }

  private unblockCpf = async (request: express.Request, response: express.Response) => {
    const cpf = request.params.cpf;
    if(!cpf){
      response.status(400);
      response.send({
        message: 'cpf must be informed!'
      });
      return;
    }
    if(!this.isValid(cpf)){
      this.sendInvalidCpf(request, response, cpf);
      return;
    }
    const exist = await cpfModel.findOne({ cpf: cpf });
    if (!exist) {
      response.status(404);
      response.send({
        message: 'cpf not found!'
      });
      return;
    }
    await cpfModel.deleteOne({ cpf: cpf });
    response.status(204);
    response.json();
  }

  //função que verifica se um cpf é valido.
  private isValid = (cpf: string): boolean => {
    let sum = 0;
    let rest;
    if (cpf == "00000000000") return false;

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) {
      rest = 0;
    }
    if (rest != parseInt(cpf.substring(9, 10))) {
      return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) {
      rest = 0;
    }
    if (rest != parseInt(cpf.substring(10, 11))) {
      return false;
    }
    return true;
  }

  private sendInvalidCpf = (request: express.Request, response: express.Response, cpf: string) => {
    if(!this.isValid(cpf)){
      response.status(400);
      response.send({
        message: 'Invalid cpf!',
        cpf: cpf
      });
      return;
    }
  }
}

export default CPFController;