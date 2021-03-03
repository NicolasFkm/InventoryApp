import express from 'express';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import helmet from 'helmet';
import {configDB, initSequelize} from '@helpers/database/sequelize';
import { User, UserCreationAttributes, UserAttributes } from '@models/User';
import { Role } from '@enumerators/Role';
import { type } from 'os';
import UserService from '@services/UserService';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const db = initSequelize();
configDB(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

(async () => {
    try{

        await db.authenticate();
        console.log('Connection has been established successfully.');    
        await db.sync();

        app.listen(PORT, () => {
            console.log(`SERVER ON at ${PORT}`);
        });
    }
    catch(error) {
        console.log(error);
    }
})();