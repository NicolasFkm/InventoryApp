import express from 'express';
import bodyParser from "body-parser";
import helmet from 'helmet';
import { Routes } from '@routes/Routes';
import mongoose from "mongoose";

export default class App {
    public app: express.Application;
    public router: Routes;

    constructor() {
        this.app = express();
        this.config();
        this.router = new Routes();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(helmet());
    }

    public async connectDatabase(user, password, url, port, admin){
        await mongoose.connect(`mongodb://${user}:${password}@${url}:${port}/${admin}?authSource=${admin}&w=1&authMechanism=SCRAM-SHA-256`, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            auth: {
                user: user,
                password: password,
            }
        });
    }
}