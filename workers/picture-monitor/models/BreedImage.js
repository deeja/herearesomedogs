const { DataTypes, Deferrable } = require("sequelize");
const breed = require("./Breed");

module.exports = {
  name: "BreedImage",
  schemaBuilder: (sequelize) => ({
    breed_id: {
      type: DataTypes.INTEGER,

      references: {
        // This is a reference to another model
        model: sequelize.models[breed.name],

        // This is the column name of the referenced model
        key: "id",

        // This declares when to check the foreign key constraint. PostgreSQL only.
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    image_src: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }),
};
