const BreedImage = require("./BreedImage");

function getModels (sequelize){return { 
    BreedImage: BreedImage(sequelize) }
};

module.exports = {
  getModels,
};
