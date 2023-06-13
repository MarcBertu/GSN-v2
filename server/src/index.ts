import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routeCreds from './routes/Credentials';
import routeSite from './routes/Site';
import routeTask from './routes/Task';
import routeMail from './routes/Mail';
import db from './db/connection';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('OK');
});

app.use('/credentials', routeCreds);
app.use('/mail', routeMail);
app.use('/site', routeSite);
app.use('/task', routeTask);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running`);
});

db.authenticate();
