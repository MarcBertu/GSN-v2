import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routeCreds from '../routes/Credentials';
import routeTask from '../routes/Task';
import db from '../db/connection'

class Server {

    private app: express.Application;
    private port: string;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Application listen on port ${this.port}`)
        })
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API workings'
            })
        })

        this.app.use('/credentials', routeCreds);

        this.app.use('/task', routeTask);
        
    }

    middlewares() {

        // Parse the body
        this.app.use(express.json());

        // Cors
        this.app.use(cors());

    }

    async dbConnect() {
        try {
            await db.authenticate();
        }
        catch (error) {
            console.log(error);
        }
        
    }

}

export default Server;