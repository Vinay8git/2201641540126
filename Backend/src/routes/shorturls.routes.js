// routes/shorturls.routes.js
import express from 'express';
import { createShortUrl, redirectFromShortUrl, getShortUrlStats } from '../controller/shortUrl.controller.js';

const router = express.Router();

// create
router.post('/', createShortUrl);

// stats
router.get('/:id/stats', getShortUrlStats);

// redirect — careful with order if you mount this router at /
// if router is mounted at '/', ensure this doesn't conflict
router.get('/:id', redirectFromShortUrl);

export default router;
