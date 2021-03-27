import dotenv from 'dotenv';
import App from 'app';
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || "mixtura-data";
const DATABASE_PORT = parseInt(process.env.DATABASE_PORT!) || 27017;
const MONGO_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME || "root";
const MONGO_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD || "root";
const MONGO_DB_ADMIN = "admin";


(async () => {
    try {
        console.log("Mixtura");
        
        await mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${DATABASE_URL}:${DATABASE_PORT}/${MONGO_DB_ADMIN}?authSource=${MONGO_DB_ADMIN}&w=1&authMechanism=SCRAM-SHA-256`, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            auth: {
                user: MONGO_USERNAME,
                password: MONGO_PASSWORD,
            }
        });
        
        console.log("Established");
        const app = new App().app;

        app.listen(PORT, () => {
            console.log(`SERVER ON at ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
})();