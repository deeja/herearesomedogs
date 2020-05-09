const { DataTypes } = require("sequelize");

module.exports = {
  name: "BreedImage",
  table: "breed_image",
  schema: {
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
};