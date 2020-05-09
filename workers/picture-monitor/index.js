require("dotenv").config();
const { getBreedImageListFromJson, downloadBreedImageJson } = require("./dog");
const { updateDatabase } = require("./database");

const url =
  "https://api.github.com/repos/deeja/dog-api-images/git/trees/master?recursive=1";

//https://raw.githubusercontent.com/deeja/dog-api-images/master/borzoi/n02090622_10281.jpg
//https://agdonjjnso.cloudimg.io/v7/_dog_/[PATH]

const main = async () => {
  console.log("Downloading JSON", url);
  const json = await downloadBreedImageJson(url);
  console.log("Finished downloading JSON", url);
  const imageList = getBreedImageListFromJson(json);
  //console.log(imageList);
  console.log("Updating database");
  updateDatabase(imageList);
  console.log(`database updated (${imageList.length})`);
};

console.log("Starting");
main();
