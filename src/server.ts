import { configDB, initSequelize } from "@helpers/database/sequelize";
import dotenv from 'dotenv';
import app from 'app';

dotenv.config();
const db = initSequelize();
configDB(db);
const PORT = process.env.PORT || 3000;


(async () => {
    try {

        await db.authenticate();
        console.log('Connection has been established successfully.');
        await db.sync();

        app.listen(PORT, () => {
            console.log(`SERVER ON at ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
})();