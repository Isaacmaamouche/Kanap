import { itemsSection } from "./home/homePageSelectors.mjs";
import { populatePageWithProducts } from "./home/populatePageWithProducts.mjs";

const generateHomePage = () => {
  populatePageWithProducts(itemsSection);
};

document.addEventListener("DOMContentLoaded", generateHomePage);
