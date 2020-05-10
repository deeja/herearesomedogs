function getModels(sequelize) {
  const models = [
    require("./Update.js"),
    require("./Breed"),
    require("./BreedImage"),
  ];
  const result = {};

  // build models
  for (const model of models) {
    result[model.name] = modelFactory(sequelize, model);
  }

  // set relationships
  for (const key in result) {
    const model = result[key];
    if (model.setRelationships) {
      model.setRelationships(result[key], result); 
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
