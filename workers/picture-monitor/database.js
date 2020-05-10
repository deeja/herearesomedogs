const Sequelize = require("sequelize");
const Keys = require("./keys");
const ModelFactory = require("./models/index");

const getSequelizeClient = async () => {
  const sequelize = new Sequelize(
    Keys.PGDATABASE,
    Keys.PGUSER,
    Keys.PGPASSWORD,
    {
      host: Keys.PGHOST,
      logging: false,
      dialect: "postgres",
    }
  );

  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
  const models = ModelFactory.getModels(sequelize);
  await sequelize.sync();
  return sequelize;
};

const updateDatabase = async (breeds) => {
  const sequelize = await getSequelizeClient();
  const models = sequelize.models;
  await sequelize.transaction(async (t) => {
    await clearBreedsAndImages(models);
    await updateBreedImages(models, breeds);
  });
};

const clearBreedsAndImages = async (models) => {
  const all = { where :  Sequelize.literal('1=1')};
  await models.BreedImage.destroy(all);
  await models.Breed.destroy(all);
};

const updateBreedImages = async (models, breeds) => {
  const breedKeys = Object.keys(breeds).map((name) => ({ name }));
  const result = await models.Breed.bulkCreate(breedKeys);
  console.log("Added Breeds:", result.length);
  const lookup = createCreatedBreedLookup(result);
  const breedImages = buildImageEntryList(breeds, lookup);
  const createdImages = await models.BreedImage.bulkCreate(breedImages);
  console.log("Added images: ", createdImages.length);
};

const getBreeds = (breedList) => {
  return Object.keys(breedList);
};

const createCreatedBreedLookup = (createdBreeds) => {
  const result = {};
  for (const breed of createdBreeds) {
    result[breed.name] = breed.id;
  }
  return result;
};

const buildImageEntryList = (breedList, breedLookup) => {
  const images = [];
  const breedKeys = Object.keys(breedList);

  for (let breedKey of breedKeys) {
    const breedImages = breedList[breedKey];
    const breedId = breedLookup[breedKey];

    for (const image of breedImages) {
      images.push({ breed_id: breedId, image });
    }
  }

  return images;
};

module.exports = {
  updateDatabase,
  getDatabaseConnection: getSequelizeClient,
  getBreeds,
  createCreatedBreedLookup,
  buildImageEntryList,
};
