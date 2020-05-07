const fs = require("fs");
const axios = require("axios");

jest.mock("axios");

const { getBreedImageListFromJson, downloadBreedImageJson } = require("./dog");

const dogResponseExample = () => fs.readFileSync("example.json", "utf8");

describe("getBreedImageListFromJson", () => {
  test("example json is parsed correctly", async () => {
    const testJson = JSON.parse(dogResponseExample());
    const breedList = getBreedImageListFromJson(testJson);
    expect(Object.keys(breedList).length).toEqual(145);
  }),
    test("breed names are as expected", async () => {
      const testJson = JSON.parse(dogResponseExample());
      const breedList = getBreedImageListFromJson(testJson);
      expect(Object.keys(breedList)[42]).toEqual("frise-bichon");
      expect(Object.keys(breedList)[21]).toEqual("chihuahua");
    });
});

describe("downloadBreedImageJson", () => {
  test("correct url is passed to axios", async () => {
    let expectedUrl = "this is my url";
    const resp = { data: "{}" };
    let actualUrl;
    axios.get.mockImplementation((url) => {
      actualUrl = url;
      return Promise.resolve(resp);
    });
    await downloadBreedImageJson(expectedUrl);
    expect(expectedUrl).toEqual(actualUrl);
  }),
    test("data is passed back correctly", async () => {
      const resp = {
        data: dogResponseExample(),
      };
      axios.get.mockImplementation(() => {
        return Promise.resolve(resp);
      });
      const result = await downloadBreedImageJson("a url");
      expect(result).toBe(resp.data);
    });
});
