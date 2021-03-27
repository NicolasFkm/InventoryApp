import express from 'express';
import bodyParser from "body-parser";
import helmet from 'helmet';
import { Routes } from '@routes/Routes';

export default class App {
    public app: express.Application;
    public router: Routes;

    constructor() {
        this.app = express();
        this.config();
        this.router = new Routes();
        this.router.map(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(helmet());
    }
}