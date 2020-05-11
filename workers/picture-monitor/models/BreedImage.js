const { DataTypes } = require("sequelize");
const breedDefinition = require("./Breed");



module.exports = {
  name: "BreedImage",
  schemaBuilder: (sequelize) => ({
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }),
  setRelationships: function(models) {
    models[breedDefinition.name].hasMany(models.BreedImage, {foreignKey: this.foreignKeys.breed});
  },
  foreignKeys:{
    breed: 'fk_breed_id'
  }
};
