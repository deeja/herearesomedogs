function getModels(sequelize) {
  const models = [require("./Breed"), require("./BreedImage")];
  const result = {};

  for (const model of models) {    
    result[model.name] = modelFactory(sequelize, model);    
  }

  return result;
}

const modelFactory = (sequelize, model) => {
  const customModel = sequelize.define(
    model.name,
    model.schemaBuilder(sequelize),
    {
      sequelize,
      modelName: model.name,
    }
  );
  return customModel;
};

module.exports = {
  getModels,
};
