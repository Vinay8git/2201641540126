import { generateNanoId } from "../utils/helper.js";
import urlSchema from '../models/shortUrl.model.js'; // Import the shortUrl model
import { saveShortUrl } from '../dao/shortUrl.dao.js'; // Import the saveShortUrl function
// This service generates a short URL and saves it to the database

export const shortUrlService = async (url) => {
    const shortUrl = await generateNanoId(7);
    if(!shortUrl) {
        throw new Error("Failed to generate Short URL");
    }
    await saveShortUrl(shortUrl, url);
    return shortUrl;
}

// export const shortUrlServiceWithUser = async (url, userId) => {
//     const shortUrl = await generateNanoId(7);
//     await saveShortUrl(shortUrl, url, userId);
//     return shortUrl;
// }