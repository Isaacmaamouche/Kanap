import { fetchProductFromApi } from "../utils/fetchProductFromApi.mjs";
import { createItem } from "./createItem.mjs";

export const populatePageWithProducts = async (parentElement) => {
  const getProductsFromAPI = await fetchProductFromApi();

  getProductsFromAPI.forEach((product) => {
    const productElement = createItem(
      product._id,
      product.imageUrl,
      product.altTxt,
      product.name,
      product.description
    );
    parentElement.appendChild(productElement);
  });
};
