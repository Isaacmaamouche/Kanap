import { fetchProductFromApi } from "../utils/fetchProductFromApi.mjs";
import { saveToLocalStorage } from "../utils/localStorage.mjs";

export const generateProductPage = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const productID = urlParams.get("id");

  const productFromAPI = await fetchProductFromApi(productID);
  // Automatically wait for the promise to be resolve before continuing
  // https://www.javascripttutorial.net/javascript-top-level-await/
  // "When a module imports a top-level await module,
  // it waits for the top-level await module to complete before evaluating its body"

  document.title = productFromAPI.name;

  const itemImg = document.querySelector(".item__img");
  const img = document.createElement("img");
  img.setAttribute("src", productFromAPI.imageUrl);
  img.setAttribute("alt", productFromAPI.altTxt);
  itemImg.appendChild(img);

  const title = document.querySelector("#title");
  title.innerHTML = productFromAPI.name;

  const price = document.querySelector("#price");
  price.innerHTML = productFromAPI.price;

  const description = document.querySelector("#description");
  description.innerHTML = productFromAPI.description;

  let selectedColor = null;
  const select = document.querySelector("#colors");
  const updateColor = () => (selectedColor = select.value);
  select?.addEventListener("change", updateColor);

  productFromAPI.colors.forEach((color) => {
    const option = document.createElement("option");
    option.setAttribute("value", color);
    option.innerHTML = color;
    select.appendChild(option);
  });

  let selectedQuantity = 0;
  const quantity = document.querySelector("#quantity");
  const updateQuantity = () => (selectedQuantity = quantity.value);
  quantity?.addEventListener("change", updateQuantity);

  const addToCart = () => {
    if (selectedColor && selectedQuantity > 0) {
      saveToLocalStorage({ productID, selectedColor, selectedQuantity });
    } else if (!selectedColor) {
      alert("Vous devez choisir une couleur");
    } else if (selectedQuantity == 0) {
      alert("Vous devez choisir une quantité");
    }
  };

  const addButton = document.querySelector("#addToCart");
  addButton?.addEventListener("click", addToCart);
};
