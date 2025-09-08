import express from 'express';
// import nanoid from 'nanoid';
//        ^^^^^^
// SyntaxError: The requested module 'nanoid' does not provide an export named 'default'
//     at ModuleJob._instantiate (node:internal/modules/esm/module_job:177:21)
//     at async ModuleJob.run (node:internal/modules/esm/module_job:260:5)
//     at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:543:26)
//     at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)
// Solution: Use the Destructuring import syntax to import nanoid correctly.
// import {nanoid} from 'nanoid';
import dotenv from 'dotenv';
import connectDB from "./src/config/mongo.config.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import urlSchema from './src/models/shortUrl.model.js'; // Import the shortUrl model
import shortUrl from './src/routes/shorturls.routes.js'; // Import the shortUrl routes
import { redirectFromShortUrl } from './src/controller/shortUrl.controller.js';

dotenv.config('./.env'); // Load environment variables from .env file


const app = express();

app.use(express.json())  // Middleware to parse JSON data or Url Body
app.use(express.urlencoded({extended: true})); // Middleware to parse JSON and URL-encoded data
app.use("/api/create", shortUrl)
app.use(errorHandler);

app.get("/:id", redirectFromShortUrl);

app.listen(3000, () => {
    connectDB();
    console.log("Server is running on port 3000");
})

//Two HTTP methods are used in this code:
//GET : For Redirection
//POST : For Creating ShortURLs