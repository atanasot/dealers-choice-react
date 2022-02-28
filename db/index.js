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
    const danceAndTheather = await Department.create({ name: "Dance & Theather" });
    const literatureAndLanguages = await Department.create({
      name: "Literature & Languages",
    });
    console.log("***********success***********");

    const [
      computerScience,
      mechanicalEng,
      electricalEng,
      environmentalEng,
      chemicalEng,
      computerEng,
      chemistry,
      biology,
      math,
      arabic,
      french,
      english,
      ballet,
      theather,
      modernDance,
    ] = await Promise.all(
      [
        "Computer Science",
        "Mechanical Engineering",
        "Electrical Engineering",
        "Environmental Enginneering",
        "Chemical Engineering",
        "Computer Engineering",
        "Chemistry",
        "Biology",
        "Mathematics",
        "Arabic",
        "French",
        "English",
        "Ballet",
        "Theather",
        "Modern Dance",
      ].map((name) => Major.create({ name }))
    );

    computerScience.departmentId = science.id;
    mechanicalEng.departmentId = engineering.id;
    electricalEng.departmentId = engineering.id;
    environmentalEng.departmentId = engineering.id;
    chemicalEng.departmentId = engineering.id;
    computerEng.departmentId = engineering.id;
    chemistry.departmentId = science.id;
    biology.departmentId = science.id;
    math.departmentId = science.id;
    arabic.departmentId = literatureAndLanguages.id;
    french.departmentId = literatureAndLanguages.id;
    english.departmentId = literatureAndLanguages.id;
    ballet.departmentId = danceAndTheather.id;
    theather.departmentId = danceAndTheather.id;
    modernDance.departmentId = danceAndTheather.id;

    await Promise.all([
      computerScience.save(),
      mechanicalEng.save(),
      electricalEng.save(),
      environmentalEng.save(),
      chemicalEng.save(),
      computerEng.save(),
      chemistry.save(),
      biology.save(),
      math.save(),
      arabic.save(),
      french.save(),
      english.save(),
      ballet.save(),
      theather.save(),
      modernDance.save(),
    ]);
  } catch (err) {
    console.log(err);
  }
};


module.exports = {
    sequelize,
    syncAndSeed,
    models: {
        Department,
        Major
    }
}