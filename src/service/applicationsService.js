const Applications = require("../models/Applications");
const Jobseekers = require("../models/Jobseekers");
const JobAdverts = require("../models/JobAdverts");

class ApplicationsService {
  // Başvuru oluştur
  async createApplication(data) {
    return await Applications.create(data);
  }

  // ID ile başvuru al
  async getApplicationById(id) {
    return await Applications.findByPk(id, {
      include: [
        { model: Jobseekers },
        { model: JobAdverts }
      ]
    });
  }

  // Başvuruyu güncelle
  async updateApplication(id, data) {
    return await Applications.update(data, { where: { id } });
  }

  // Başvuruyu sil
  async deleteApplication(id) {
    return await Applications.destroy({ where: { id } });
  }

  // Tüm başvuruları al
  async getAllApplications() {
    return await Applications.findAll({
      include: [
        { model: Jobseekers },
        { model: JobAdverts }
      ]
    });
  }
}

module.exports = new ApplicationsService();