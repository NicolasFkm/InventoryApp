import express from 'express';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import helmet from 'helmet';
import {configDB, initSequelize} from '@helpers/database/sequelize';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
configDB();
const db = initSequelize();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

(async () => {
    try{
        await db.authenticate();
        console.log('Connection has been established successfully.');    
        await db.sync({force: true});

        app.listen(PORT, () => {
            console.log(`SERVER ON at ${PORT}`);
        });
    }
    catch(error) {
        console.log(error);
    }
})();