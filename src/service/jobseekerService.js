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
  Applications,  // Applications modelini dahil ettik
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
      {
        model: Applications,  // Jobseeker'lara ait başvuruları dahil ettik
        include: [JobAdverts], // JobAdverts ile ilişkiyi de dahil ettik
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
      {
        model: Applications,  // Jobseeker'ların başvuruları
        include: [JobAdverts],  // JobAdverts ile ilişkili başvuruları da dahil ettik
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
  const jobseeker = await Jobseekers.findByPk(id, {
    include: [
      Applications,        // Bağlı Applications'ı da içerecek şekilde silme işlemi yapılacak
      CurriculaVitaes,    // Bağlı CurriculaVitaes verileri de silinecek
      JobExperiences,      // Bağlı JobExperiences verileri de silinecek
      JobseekerLanguages   // Bağlı JobseekerLanguages verileri de silinecek
    ]
  });

  if (jobseeker) {
    // Cascade delete sayesinde bağlı veriler de otomatik olarak silinir
    await jobseeker.destroy();

    // Kullanıcıyı (Users) da sil
    const user = await Users.findByPk(jobseeker.user_id);
    if (user) {
      await user.destroy();  // Users kaydını sil
    }

    return true;
  }
  return false;
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
      {
        model: Applications,  // Jobseeker'ların başvuruları
        include: [JobAdverts],  // JobAdverts ile ilişkili başvuruları da dahil ettik
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