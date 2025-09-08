import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./src/config/mongo.config.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import shortUrlRoutes from './src/routes/shorturls.routes.js';
import { redirectFromShortUrl } from './src/controller/shortUrl.controller.js';

dotenv.config(); // no need to pass './.env' if it's in project root

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount short URL routes
app.use("/shorturls", shortUrlRoutes);

// Redirect endpoint (root-level)
app.get("/:id", redirectFromShortUrl);

// Error handler (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
