const { DataTypes } = require("sequelize");

module.exports = {
  name: "Update",
  schemaBuilder: () => ({
    sha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }),
  setRelationships: (currentModel, models) => {},
};
