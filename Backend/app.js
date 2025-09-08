import express from 'express';
import dotenv from 'dotenv';
import shortUrl from './src/routes/shorturls.routes.js';

dotenv.config('./.env'); //Load Environment Variables from .env file.

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//POST Method
app.use("/api/create", shortUrl);

//GET Method
app.get("/:id", redirectFromShortUrl);

app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
})


//Two HTTP Methods are used in this code:
//GET : For Redirection
//POST : For Creating Short URLs