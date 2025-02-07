const {
  Jobseekers,
  CurriculaVitaes,
  Educations,
  JobExperiences,
  JobseekerLanguages,
  Languages,
  SocialMedias,
} = require("../models");

const getAllJobseekers = async () => {
  return await Jobseekers.findAll({
    include: [
      {
        model: CurriculaVitaes,
        include: [
          { model: Educations },
          { model: JobExperiences },
          { model: JobseekerLanguages, include: [Languages] },
          { model: SocialMedias },
        ],
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
          { model: Educations },
          { model: JobExperiences },
          { model: JobseekerLanguages, include: [Languages] },
          { model: SocialMedias },
        ],
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
  const jobseeker = await Jobseekers.findByPk(id);
  if (jobseeker) {
    return await jobseeker.destroy();
  }
  return null;
};

module.exports = {
  getAllJobseekers,
  getJobseekerById,
  createJobseeker,
  updateJobseeker,
  deleteJobseeker,
};
