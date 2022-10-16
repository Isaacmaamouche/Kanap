import { fetchProductFromApi } from "../utils/fetchProductFromApi.mjs";
import { createItem } from "./createItem.mjs";
import { itemsSection } from "./homePageSelectors.mjs";

/**
 * Retrives all products info from the API and populate the home page with html elements
 */
export const populatePageWithProducts = async () => {
  const getProductsFromAPI = await fetchProductFromApi();

  getProductsFromAPI.forEach((product) => {
    const productElement = createItem(
      product._id,
      product.imageUrl,
      product.altTxt,
      product.name,
      product.description
    );
    itemsSection.appendChild(productElement);
  });
};
