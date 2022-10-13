import { fetchProductFromApi } from "../utils/fetchProductFromApi.mjs";
import { saveToLocalStorage } from "../utils/localStorage.mjs";
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

  titleElement.innerHTML = name;

  priceElement.innerHTML = price;

  descriptionElement.innerHTML = description;

  colors.forEach((color) => {
    const option = document.createElement("option");
    option.setAttribute("value", color);
    option.innerHTML = color;
    selectElement.appendChild(option);
  });

  addButtonElement?.addEventListener("click", () =>
    addToCart(select.value, Number(quantityInputElement.value))
  );
};
