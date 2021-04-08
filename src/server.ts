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
        console.log("Starting Mixtura Criativa.");        
        const app = new App();
        console.log("App created.");

        await app.connectDatabase(MONGO_USERNAME, MONGO_PASSWORD, DATABASE_URL, DATABASE_PORT, MONGO_DB_ADMIN);
        console.log("Database connection has been established successfully.");
        
        const express = app.app;
        app.router.map(express);
        console.log("Routes mapped.");

        express.listen(PORT, () => {
            console.log(`SERVER ON at ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
})();