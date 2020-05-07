

const url = "https://api.github.com/repos/deeja/bing-maps-loader/git/trees/master?recursive=1";
const result = downloadBreedImageJson(url).then(data => getBreedImageListFromJson(data))
console.log("Starting")
Promise.resolve(result).then(() => console.log("Finished"));

