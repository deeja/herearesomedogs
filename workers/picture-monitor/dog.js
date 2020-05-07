const axios = require("axios");

function downloadBreedImageJson(url) {
  return axios.get(url).then((res) => res.data);
}

function getBreedImageListFromJson(data) {
  // naive assumption that all folders are breed types
  const breedObj = {};
  for (const breed of data.tree) {
    const pathArr = breed.path.split("/");
    const [breedSection] = pathArr;
    if (breed.type === "blob" && pathArr.length === 2) {
      if (!breedObj[breedSection]) {
        breedObj[breedSection] = [];
      }
      breedObj[breedSection].push(breed.path);
    }
  }
  return breedObj;
}

module.exports = { downloadBreedImageJson, getBreedImageListFromJson };
