const {
  Jobseekers,
  CurriculaVitaes,
  Educations,
  JobExperiences,
  JobseekerLanguages,
  Languages,
  SocialMedias,
  Users,
  Employers,
  JobAdverts,
  Departments,
  Schools,
} = require("../models");

const getAllJobseekers = async () => {
  return await Jobseekers.findAll({
    include: [
      {
        model: CurriculaVitaes,
        include: [
          { model: Educations, include: [Departments, Schools] },
          { model: JobExperiences },
          { model: JobseekerLanguages, include: [Languages] },
          { model: SocialMedias },
        ],
      },
      {
        model: Users,
        attributes: { exclude: ['password'] },
      },
    ],
  });
};

const getJobseekerById = async (id) => {
  return await Jobseekers.findByPk(id, {
    include: [
      {
        model: CurriculaVitaes,
        include: [
          { model: Educations, include: [Departments, Schools] },
          { model: JobExperiences },
          { model: JobseekerLanguages, include: [Languages] },
          { model: SocialMedias },
        ],
      },
      {
        model: Users,
        attributes: { exclude: ['password'] },
      },
    ],
  });
};

const createJobseeker = async (jobseekerData) => {
  return await Jobseekers.create(jobseekerData);
};

const updateJobseeker = async (id, jobseekerData) => {
  const jobseeker = await Jobseekers.findByPk(id);
  if (jobseeker) {
    return await jobseeker.update(jobseekerData);
  }
  return null;
};

const deleteJobseeker = async (id) => {
  const jobseeker = await Users.findByPk(id);
  if (jobseeker) {
    // İş arayanı isDeleted olarak işaretle
    return await jobseeker.update({ isDeleted: true });
  }
  return null;
};

const getProfile = async (userId) => {
  const jobseeker = await Jobseekers.findOne({
    where: { user_id: userId },
    include: [
      {
        model: CurriculaVitaes,
        include: [
          { model: Educations, include: [Departments, Schools] },
          { model: JobExperiences },
          { model: JobseekerLanguages, include: [Languages] },
          { model: SocialMedias },
        ],
      },
      {
        model: Users,
        attributes: { exclude: ['password'] },
      },
    ],
  });
  return jobseeker;
};

module.exports = {
  getAllJobseekers,
  getJobseekerById,
  createJobseeker,
  updateJobseeker,
  deleteJobseeker,
  getProfile,
};