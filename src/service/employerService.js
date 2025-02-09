const {
  Employers,
  Users,
  JobAdverts,
} = require("../models");

const getAllEmployers = async () => {
  return await Employers.findAll({
    include: [
      {
        model: Users,
        attributes: { exclude: ['password'] },
      },
      {
        model: JobAdverts,
      },
    ],
  });
};

const getEmployerById = async (id) => {
  return await Employers.findByPk(id, {
    include: [
      {
        model: Users,
        attributes: { exclude: ['password'] },
      },
      {
        model: JobAdverts,
      },
    ],
  });
};

const createEmployer = async (employerData) => {
  return await Employers.create(employerData);
};

const updateEmployer = async (id, employerData) => {
  const employer = await Employers.findByPk(id);
  if (employer) {
    return await employer.update(employerData);
  }
  return null;
};

const deleteEmployer = async (id) => {
  const employer = await Employers.findByPk(id);
  if (employer) {
    return await employer.destroy();
  }
  return null;
};

const getProfile = async (userId) => {
  const employer = await Employers.findOne({
    where: { user_id: userId },
    include: [
      {
        model: Users,
        attributes: { exclude: ['password'] },
      },
      {
        model: JobAdverts,
      },
    ],
  });
  return employer;
};


module.exports = {
  getAllEmployers,
  getEmployerById,
  createEmployer,
  updateEmployer,
  deleteEmployer,
  getProfile,
};
