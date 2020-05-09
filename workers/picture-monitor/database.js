// get sha from file list
// check if sha exists in database update
// if yes, quit out
// if no, continue

// breeds added / removed if not existing on db

// get all photos from database
// get all photos from files

// remove and add where needed

const Sequelize = require("sequelize");
const Keys = require("./keys");

const { getModels } = require("./models/index");

const sequelize = new Sequelize(Keys.PGDATABASE, Keys.PGUSER, Keys.PGPASSWORD, {
  host: Keys.PGHOST,
  dialect: "postgres",
});

const updateDatabase = async (imageList) => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

  const models = getModels(sequelize);

  await sequelize.sync();

  console.log("Models available:", sequelize.models);

  await models.Breed.create({
    name: "poodle",
  });

  await models.BreedImage.create({
    breed_id: 1,
    image_src: "--ONE OF THESE.JPG",
  });
};

module.exports = { updateDatabase };
