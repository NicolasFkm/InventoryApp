import 'module-alias/register';
import express from 'express';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import helmet from 'helmet';
import sequelize from '@helpers/database/sequelize';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const db = sequelize();

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