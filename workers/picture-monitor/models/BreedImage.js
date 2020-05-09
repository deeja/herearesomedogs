const { Model, DataTypes } = require("sequelize");

class BreedImage extends Model {}

module.exports = (sequelize) => {
  BreedImage.init(
    {
      breed: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: "breed_image" }
  );
  return BreedImage;
};
