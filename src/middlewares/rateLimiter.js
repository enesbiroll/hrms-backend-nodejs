const client = require("../config/redisClient");

const rateLimiter = (maxRequests, timeWindow) => {
  return (req, res, next) => {
    const userKey = `rate:${req.ip || req.user?.id}`; // Kullanıcı IP veya ID bazlı anahtar
    const currentTime = Date.now();

    client.lrange(userKey, 0, -1, (err, timestamps) => {
      if (err) {
        console.error("Redis hatası:", err);
        return res.status(500).json({ message: "Sunucu hatası" });
      }

      const filteredTimestamps = timestamps.filter((timestamp) => currentTime - timestamp < timeWindow);

      if (filteredTimestamps.length >= maxRequests) {
        return res.status(429).json({ message: "Çok fazla istek yaptınız, bekleyin." });
      }

      client.rpush(userKey, currentTime, () => {
        client.expire(userKey, Math.ceil(timeWindow / 1000)); // Redis key'inin süresi (saniye cinsinden)
        next();
      });
    });
  };
};

module.exports = rateLimiter;
