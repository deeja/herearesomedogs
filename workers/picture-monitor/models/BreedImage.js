const { DataTypes } = require("sequelize");
const breed = require("./Breed");

module.exports = {
  name: "BreedImage",
  schemaBuilder: (sequelize) => ({
    breed_id: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }),
  setRelationships: (currentModel, models) => {
    const breedModel = models[breed.name];
    currentModel.belongsTo(breedModel);
    breedModel.hasMany(currentModel);
  },
};
