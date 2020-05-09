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

const {getModels} = require("./models/index")

const sequelize = new Sequelize(Keys.PGDATABASE, Keys.PGUSER, Keys.PGPASSWORD, {
  host: Keys.PGHOST,
  dialect: "postgres",
});

const updateDatabase = async () => {
  await sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

  const models = getModels(sequelize);
  
  console.log(models)

  return models.BreedImage.sync({ force: true }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return models.BreedImage.create({
      breed: "--Something",
      image:"--ONE OF THESE.JPG"
    });
  });


};

module.exports = { updateDatabase };
