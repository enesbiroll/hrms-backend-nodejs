const JobAdverts = require("../models/JobAdverts");
const Employers = require("../models/Employers");
const Cities = require("../models/Cities");
const JobPositions = require("../models/JobPositions");
const client = require("../config/redisClient"); // Redis Client'i dahil ettik

class JobAdvertsService {
    // Yeni iş ilanı oluştur
    async createJobAdvert(data) {
        const jobAdvert = await JobAdverts.create(data);
        await this.clearCache(); // Cache temizle
        return jobAdvert;
    }

    // ID ile iş ilanı al (CACHE DESTEKLİ)
    async getJobAdvertById(id) {
        const cacheKey = `jobAdvert:${id}`;

        // Redis'ten veriyi getir
        const cachedData = await new Promise((resolve, reject) => {
            client.get(cacheKey, (err, data) => {
                if (err) reject(err);
                resolve(data ? JSON.parse(data) : null);
            });
        });

        if (cachedData) {
            console.log(`🟢 Redis Cache’den çekildi: ${cacheKey}`);
            return cachedData;
        }

        // Redis'te yoksa veritabanından çek ve cache'e kaydet
        const jobAdvert = await JobAdverts.findByPk(id, {
            include: [{ model: Employers }, { model: Cities }, { model: JobPositions }]
        });

        if (jobAdvert) {
            client.setex(cacheKey, 3600, JSON.stringify(jobAdvert)); // 1 saat cache’te tut
        }

        return jobAdvert;
    }

    // İş ilanı güncelle
    async updateJobAdvert(id, data) {
        const updated = await JobAdverts.update(data, { where: { id } });
        if (updated[0]) {
            await this.clearCache(id); // Cache temizle
        }
        return updated;
    }

    // İş ilanı sil
    async deleteJobAdvert(id) {
        const deleted = await JobAdverts.destroy({ where: { id } });
        if (deleted) {
            await this.clearCache(id); // Cache temizle
        }
        return deleted;
    }

    // Tüm iş ilanlarını al (CACHE DESTEKLİ)
    async getAllJobAdverts(filters = {}, page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const where = {};

        if (filters.job_position_id) where.job_position_id = filters.job_position_id;
        if (filters.employer_id) where.employer_id = filters.employer_id;
        if (filters.city_id) where.city_id = filters.city_id;

        const cacheKey = `jobAdverts:${JSON.stringify(filters)}:page${page}:limit${limit}`;

        // Redis'ten veriyi çek
        const cachedData = await new Promise((resolve, reject) => {
            client.get(cacheKey, (err, data) => {
                if (err) reject(err);
                resolve(data ? JSON.parse(data) : null);
            });
        });

        if (cachedData) {
            console.log(`🟢 Redis Cache’den çekildi: ${cacheKey}`);
            return cachedData;
        }

        // Veritabanından çek
        const { count, rows } = await JobAdverts.findAndCountAll({
            where,
            include: [{ model: Employers }, { model: Cities }, { model: JobPositions }],
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10)
        });

        const result = { count, rows, page, limit };

        // Redis'e kaydet
        client.setex(cacheKey, 3600, JSON.stringify(result)); // 1 saat cache’te tut

        return result;
    }

    // Cache temizleme fonksiyonu
    async clearCache(id = null) {
        if (id) {
            client.del(`jobAdvert:${id}`);
        } else {
            client.keys("jobAdverts:*", (err, keys) => {
                if (!err && keys.length > 0) {
                    client.del(keys);
                }
            });
        }
    }
}

module.exports = new JobAdvertsService();
