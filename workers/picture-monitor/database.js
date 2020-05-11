const Sequelize = require("sequelize");
const Keys = require("./keys");
const ModelFactory = require("./models/index");

const breedImageDefinition = require("./models/BreedImage")

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
  console.log("Authenticating with DB");
  await sequelize.authenticate()
  console.log("Connection has been established successfully.");
  ModelFactory.getModels(sequelize);
  await sequelize.sync();
  return sequelize;
};

const hasUpdateEntry = async (shaToken) => {
  const sequelize = await getSequelizeClient();
  const entry = await sequelize.models.Update.findAll({
    where: {
      sha: shaToken,
    },
  });
  return entry.length > 0;
};

const updateDatabase = async (breeds, shaToken) => {
  const sequelize = await getSequelizeClient();
  const models = sequelize.models;
  await sequelize.transaction(async (t) => {
    console.log("Starting update transaction");
    await clearBreedsAndImages(t, models);
    await updateBreedImages(t, models, breeds);
    await updateShaToken(t, models, shaToken);
    console.log("Finished update - Committing transaction");
  });
  console.log("Data committed - Update complete");
};

const updateShaToken = (transaction, models, shaToken) => {
  return models.Update.create({ sha: shaToken }, { transaction });
};

const clearBreedsAndImages = async (transaction, models) => {
  console.log("Clearing all previous Breeds and Breed Images");
  const all = { where: { id: { [Sequelize.Op.ne]: 0 } }, transaction };
  await models.Breed.destroy(all);
};

const updateBreedImages = async (transaction, models, breeds) => {
  const breedKeys = Object.keys(breeds).map((name) => ({ name }));
  const result = await models.Breed.bulkCreate(breedKeys, { transaction });
  console.log("Added Breeds:", result.length);
  const lookup = createCreatedBreedLookup(result);
  const breedImages = buildImageEntryList(breeds, lookup);
  const createdImages = await models.BreedImage.bulkCreate(breedImages, {
    transaction,
  });
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
      images.push({ [breedImageDefinition.foreignKeys.breed]: breedId, image });
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
  hasUpdateEntry,
};
