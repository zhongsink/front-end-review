/**
 * Encodes a URL to a shortened URL.
 *
 * @param {string} longUrl
 * @return {string}
 * encode => 长地址 映射到短地址
 * decode => 从短地址获取长地址
 */
var map = new Map();
var encode = function(longUrl) {
  let shortUrl = +(new Date());
  map.set(shortUrl, longUrl);
  return shortUrl;
};

/**
 * Decodes a shortened URL to its original URL.
 *
 * @param {string} shortUrl
 * @return {string}
 */
var decode = function(shortUrl) {
  return map.get(shortUrl);
};