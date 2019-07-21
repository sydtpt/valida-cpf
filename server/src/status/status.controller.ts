import * as express from 'express';
import cpfModel from '../cpf/cpf.model';

class StatusController {

    public path = '/status';
    public router = express.Router();
    
    constructor(){
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.serverStatus);
    }

    private serverStatus = async (request: express.Request, response: express.Response) => {
        let count = await cpfModel.count({});
        response.send({
            "startedTime": request.app.locals.startedAt,
            "total_consult_requests": request.app.locals.total_consult,
            total_blocked: count
        });
    }
}

export default StatusController;