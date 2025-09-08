// controller/shortUrl.controller.js
import { shortUrlService } from '../services/shortUrl.service.js';
import { getShortUrlByCode, recordClick, getStats } from "../dao/shortUrl.dao.js";
import { NotFoundError, BadRequestError } from '../utils/errorHandler.js';

export const createShortUrl = async (req, res, next) => {
  try {
    const { url, validity, shortcode } = req.body;

    if (!url) {
      throw new BadRequestError('url is required');
    }

    // call service, returns saved doc
    const saved = await shortUrlService(url, {
      validity: validity !== undefined ? Number(validity) : undefined,
      shortcode,
      userId: req.user?.id // optional, if you have auth
    });

    const shortLink = `${process.env.APP_URL.replace(/\/$/, '')}/${saved.short_url}`;
    return res.status(201).json({
      shortLink,
      expiry: saved.expiry ? saved.expiry.toISOString() : null
    });
  } catch (err) {
    next(err);
  }
};

export const redirectFromShortUrl = async (req, res, next) => {
  try {
    const { id } = req.params; // shortcode in param
    const urlDoc = await getShortUrlByCode(id);
    if (!urlDoc) throw new NotFoundError('Short URL not found');

    // check expiry
    if (urlDoc.expiry && new Date() > new Date(urlDoc.expiry)) {
      return res.status(410).send('Short link has expired'); // 410 Gone
    }

    const clickDetail = {
      timestamp: new Date(),
      referrer: req.get('referer') || req.get('referrer') || null,
      ip: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || null,
    };

    // record click (increments clicks & pushes detail)
    await recordClick(id, clickDetail);

    // redirect to full URL
    return res.redirect(urlDoc.full_url);
  } catch (err) {
    next(err);
  }
};

export const getShortUrlStats = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stats = await getStats(id);
    if (!stats) throw new NotFoundError('Short URL not found');

    return res.json({
      shortCode: stats.short_url,
      fullUrl: stats.full_url,
      createdAt: stats.createdAt,
      expiry: stats.expiry,
      totalClicks: stats.clicks,
      clicks: stats.clicks_detail // each: { timestamp, referrer, ip, geo }
    });
  } catch (err) {
    next(err);
  }
};
