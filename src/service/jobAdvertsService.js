const JobAdverts = require("../models/JobAdverts");
const Employers = require("../models/Employers");
const Cities = require("../models/Cities");
const JobPositions = require("../models/JobPositions");
const CurriculaVitaes = require("../models/CurriculaVitaes");
const Jobseekers = require("../models/Jobseekers");

class JobAdvertsService {
    // Yeni iş ilanı oluştur
    async createJobAdvert(data) {
      return await JobAdverts.create(data);
    }

    // ID ile iş ilanı al
    async getJobAdvertById(id) {
      return await JobAdverts.findByPk(id, {
        include: [
          { model: Employers },
          { model: Cities },
          { model: JobPositions }
        ]
      });
    }

    // İş ilanı güncelle
    async updateJobAdvert(id, data) {
      return await JobAdverts.update(data, { where: { id } });
    }

    // İş ilanı sil
    async deleteJobAdvert(id) {
      return await JobAdverts.destroy({ where: { id } });
    }

    // Filtrelere göre iş ilanlarını al (Sayfalama ile)
    async getAllJobAdverts(filters = {}, page = 1, limit = 10) {
      const offset = (page - 1) * limit;
      const where = {};

      if (filters.job_position_id) {
        where.job_position_id = filters.job_position_id;
      }
      if (filters.employer_id) {
        where.employer_id = filters.employer_id;
      }
      if (filters.city_id) {
        where.city_id = filters.city_id;
      }

      const { count, rows } = await JobAdverts.findAndCountAll({
        where,
        include: [
          { model: Employers },
          { model: Cities },
          { model: JobPositions }
        ],
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10)
      });
      return { count, rows, page, limit };
    }
}


module.exports = new JobAdvertsService();