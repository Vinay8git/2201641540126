// dao/shortUrl.dao.js
import UrlModel from '../models/shortUrl.model.js';

export const saveShortUrl = async (shortUrl, url, userId, expiryDate) => {
  const newUrl = new UrlModel({
      full_url: url,
      short_url: shortUrl,
      expiry: expiryDate || null
  });

  if (userId) newUrl.user = userId;

  const saved = await newUrl.save();
  return saved;
};

export const getShortUrlByCode = async (shortUrl) => {
  return await UrlModel.findOne({ short_url: shortUrl }).exec();
};

// record click: increment clicks and push click detail, return updated doc
export const recordClick = async (shortUrl, clickDetail) => {
  return await UrlModel.findOneAndUpdate(
    { short_url: shortUrl },
    { 
      $inc: { clicks: 1 },
      $push: { clicks_detail: clickDetail }
    },
    { new: true }
  ).exec();
};

// optional: get stats (you can reuse getShortUrlByCode)
export const getStats = async (shortUrl) => {
  return await UrlModel.findOne({ short_url: shortUrl })
    .select('-__v') // exclude __v if you want
    .lean()
    .exec();
};
