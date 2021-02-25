import { Sequelize } from "sequelize";
import * as path from 'path';

export default ()=>{
    const databasePath = path.join(__dirname, process.env.DATABASE_NAME!);
    
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: databasePath,
        logging: (...msg) => console.log(`[SEQUELIZE] ${msg}`),
        pool: {
            max: 5,
            min: 0,
            idle: 15000,
            acquire: 20000
        }
    });
    
    return sequelize;
};