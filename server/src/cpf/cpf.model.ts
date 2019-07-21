import * as mongoose from 'mongoose';
import CPF from './cpf.interface';
import { Promise } from 'bluebird';
Promise.promisifyAll(mongoose)

const cpfSchema = new mongoose.Schema({
  cpf: String
},{timestamps: true});
 
const cpfModel = mongoose.model<CPF & mongoose.Document>('cpf', cpfSchema);
 
export default cpfModel;