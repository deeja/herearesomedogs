require("dotenv").config();
const { getBreedImageListFromJson, downloadBreedImageJson } = require("./dog");
const Database = require("./database");
const Keys = require("./keys");

//https://raw.githubusercontent.com/deeja/dog-api-images/master/borzoi/n02090622_10281.jpg
//https://agdonjjnso.cloudimg.io/v7/_dog_/[PATH]

const main = async () => {
  const url = Keys.GIT_TREE_URL;
  if (!url) {
    throw new Error("No URL set for GIT_TREE_URL");
  }

  console.log("Downloading JSON", url);
  const json = await downloadBreedImageJson(url);

  if (json.truncated !== false) {
    throw new Error(
      "Content was truncated by GitHub. You might have a size limit issue."
    );
  }

  const hasUpdateEntry = await Database.hasUpdateEntry(json.sha)
  if (hasUpdateEntry) {
    console.log("Update SHA was found in DB. No updates needed.", json.sha);
    return;
  }
  console.log("Finished downloading JSON", url);
  const imageList = getBreedImageListFromJson(json);
  console.log("Updating database");

  await Database.updateDatabase(imageList, json.sha);
};

main();
