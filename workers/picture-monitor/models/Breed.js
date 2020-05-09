const { DataTypes } = require("sequelize");

module.exports = {
  name: "Breed",
  schemaBuilder: () => ({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }),
};
