function getModels(sequelize) {
  const models = [require("./Breed"), require("./BreedImage")];
  const result = {};

  // build models
  for (const model of models) {
    console.log("Creating model: ", model)
    result[model.name] = modelFactory(sequelize, model);

  }

  // set relationships
  for (const key in result) {
    const model = result[key];
    if (model.setRelationships) {
      model.setRelationships(result[key], result); // TODO Call this? 
    }
  }

  return result;
}

const modelFactory = (sequelize, model) => {
  const customModel = sequelize.define(
    model.name,
    model.schemaBuilder(sequelize)
  );
  return customModel;
};

module.exports = {
  getModels,
};
