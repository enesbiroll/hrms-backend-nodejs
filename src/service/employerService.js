const {
  Employers,
  Users,
  JobAdverts,
  EmployersActivations
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
  const employer = await Employers.findByPk(id, {
    include: [
      JobAdverts,            // Related JobAdverts to be deleted
      EmployersActivations,  // Related EmployersActivations to be deleted
    ],
  });

  if (employer) {
    // Delete related job adverts
    await JobAdverts.destroy({
      where: { employer_id: id },
    });

    // Delete related employer activations
    await EmployersActivations.destroy({
      where: { employer_id: id },
    });

    // Delete the employer record itself
    await employer.destroy();

    // Get and delete the associated user
    const user = await Users.findByPk(employer.user_id);
    if (user) {
      await user.destroy();  // Delete the associated user record
    }

    console.log(`Employer and associated user with ID ${id} deleted successfully along with related data.`);
    return true;
  } else {
    console.log(`Employer with ID ${id} not found.`);
    return false;
  }
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
