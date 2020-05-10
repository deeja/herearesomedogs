const database = require("../database");
const fs = require("fs");


const breedList = {
  beagle: ["f image one", "f image two", "f image three"],
  "bulldog-boston": ["s image one", "s image two"],
};

const breedLookup = {
  "bulldog-boston": 65,
  beagle: 23,
  pitbull: 99
}

const createdBreeds = () =>
  JSON.parse(fs.readFileSync("./tests/created-breeds.json", "utf8"));

describe("Set up the data to be processed", () => {
  test("should create breed entries from list ", () => {
    const result = database.getBreeds(breedList);
    expect(result.length).toBe(2);
  }),
    test("should create a lookup from the created results", () => {
      const result = database.createCreatedBreedLookup(createdBreeds());
      expect(Object.keys(result).length).toBe(145);
    }),
    test("should match images to the breed lookup and create image elements for updating the database", () => {
      const imagelist = database.buildImageEntryList(breedList, breedLookup);
      expect(imagelist.length).toBe(5);
    }),
    test("should match ids of breeds to the image breed names", () => {
      const imagelist = database.buildImageEntryList(breedList, breedLookup);
      expect(imagelist[4].breed_id).toBe(65);
    }),
    test('should match the images that are added', () => {
      const imagelist = database.buildImageEntryList(breedList, breedLookup);
      expect(imagelist[4].image).toEqual("s image two");
    });;
});
