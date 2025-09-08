// services/shortUrl.service.js
import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl, getShortUrlByCode } from '../dao/shortUrl.dao.js';

export const shortUrlService = async (url, options = {}) => {
  // options: { validity, shortcode, userId }
  const { validity, shortcode, userId } = options;

  let shortUrl = shortcode;
  if (shortUrl) {
    // verify not already used
    const existing = await getShortUrlByCode(shortUrl);
    if (existing) {
      const err = new Error('Shortcode already taken');
      err.statusCode = 409;
      throw err;
    }
  } else {
    shortUrl = await generateNanoId(7);
  }

  // compute expiry date if validity provided (in minutes)
  let expiryDate = null;
  if (typeof validity === 'number' && validity > 0) {
    expiryDate = new Date(Date.now() + validity * 60 * 1000);
  } else {
    // default validity 30 minutes if not provided
    expiryDate = new Date(Date.now() + 30 * 60 * 1000);
  }

  const saved = await saveShortUrl(shortUrl, url, userId, expiryDate);
  return saved; // return the saved document so controller can compute response
};
