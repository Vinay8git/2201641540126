// models/shortUrl.model.js
import mongoose from 'mongoose';

const clickDetailSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  referrer: { type: String, default: null },
  ip: { type: String, default: null },
  // optional: country/region/city if you enrich later
  geo: {
    country: { type: String, default: null },
    region: { type: String, default: null },
    city: { type: String, default: null },
  }
}, { _id: false });

const shortUrlSchema = new mongoose.Schema({
  full_url: { type: String, required: true },
  short_url: { type: String, required: true, index: true, unique: true },
  clicks: { type: Number, required: true, default: 0 },
  clicks_detail: { type: [clickDetailSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  expiry: { type: Date, default: null }, // set on creation using validity
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);
export default ShortUrl;
