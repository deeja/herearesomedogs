function getModels(sequelize) {
  const modelDefinitions = [
    require("./Update.js"),
    require("./Breed"),
    require("./BreedImage"),
  ];
  const models = {};

  console.log("Creating models")
  for (const definition of modelDefinitions) {
    models[definition.name] = modelFactory(sequelize, definition);
  }

  console.log("Set relationships")
  for (const definition of modelDefinitions) {
    if (definition.setRelationships) {
      definition.setRelationships(models); 
    }
  }

  return models;
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
