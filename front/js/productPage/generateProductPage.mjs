import { fetchProductFromApi } from "../utils/fetchProductFromApi.mjs";
import { addToCart } from "./addToCart.mjs";
import {
  itemImgElement,
  titleElement,
  priceElement,
  descriptionElement,
  selectElement,
  quantityInputElement,
  addButtonElement,
} from "./productPageSelectors.mjs";

// Retrive the productID from the url and query the API to get product info and to build the element of the page
export const generateProductPage = async () => {
  const currentUrl = window.location.search;
  const urlParams = new URLSearchParams(currentUrl);
  const productID = urlParams.get("id");
  const { name, imageUrl, altTxt, price, description, colors } =
    await fetchProductFromApi(productID);

  document.title = name;

  const img = document.createElement("img");
  img.setAttribute("src", imageUrl);
  img.setAttribute("alt", altTxt);
  itemImgElement.appendChild(img);

  titleElement.textContent = name;

  priceElement.textContent = price;

  descriptionElement.textContent = description;

  colors.forEach((color) => {
    const option = document.createElement("option");
    option.setAttribute("value", color);
    option.textContent = color;
    selectElement.appendChild(option);
  });

  addButtonElement.addEventListener("click", () =>
    addToCart(productID, selectElement.value, quantityInputElement.value)
  );
};
