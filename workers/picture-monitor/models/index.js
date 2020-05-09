const breedImageModelDefinition = require("./BreedImage");

function getModels(sequelize) {
  return {
    [breedImageModelDefinition.name]: modelFactory(sequelize, breedImageModelDefinition),
  };
}

const modelFactory = (sequelize, modelDefinition) => {
  const customModel = sequelize.define(
    modelDefinition.name,
    modelDefinition.schema,
    {
      sequelize,
      modelName: modelDefinition.table,
    }
  );
  return customModel;
};

module.exports = {
  getModels,
};
