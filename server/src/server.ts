import App from './app';
import CPFController from './cpf/cpf.controller';
import StatusController from './status/status.controller';

const app = new App(
  [
    new StatusController(),
    new CPFController(),
  ],
  5000,
);
 
app.listen();