const { mockProductsData } = require("../js/utils/tests/mockTestData.mjs");

describe("API - all products", () => {
  const getProductsFromAPI = mockProductsData;
  test("renders the 8 products on the home page", () => {
    expect(getProductsFromAPI.length).toBe(8);
  });
});
