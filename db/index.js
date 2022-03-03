const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/uni_majors_db"
);
const { STRING } = Sequelize;

//University majors and departments
const Major = sequelize.define("major", {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
});

const Department = sequelize.define("department", {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
});

Major.belongsTo(Department); //departmentId on major
Department.hasMany(Major);

const syncAndSeed = async () => {
  try {
    await sequelize.sync({ force: true });
    const engineering = await Department.create({ name: "Engineering" });
    const science = await Department.create({ name: "Science" });
    const danceAndTheather = await Department.create({
      name: "Dance & Theather",
    });
    const literatureAndLanguages = await Department.create({
      name: "Literature & Languages",
    });
    console.log("***********success***********");

    await Promise.all(
      [
        ["Computer Science", science.id],
        ["Mechanical Engineering", engineering.id],
        ["Electrical Engineering", engineering.id],
        ["Environmental Enginneering", engineering.id],
        ["Chemical Engineering", engineering.id],
        ["Computer Engineering", engineering.id],
        ["Chemistry", science.id],
        ["Biology", science.id],
        ["Mathematics", science.id],
        ["Arabic", literatureAndLanguages.id],
        ["French", literatureAndLanguages.id],
        ["English", literatureAndLanguages.id],
        ["Ballet", danceAndTheather.id],
        ["Theather", danceAndTheather.id],
        ["Modern Dance", danceAndTheather.id],
      ].map(([name, departmentId]) => Major.create({ name, departmentId }))
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sequelize,
  syncAndSeed,
  models: {
    Department,
    Major,
  },
};
