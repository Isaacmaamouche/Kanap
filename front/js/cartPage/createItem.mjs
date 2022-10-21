import { fetchProductFromApi } from "../utils/fetchProductFromApi.mjs";
import { deleteCartItem, setCartItem } from "../utils/localStorage.mjs";
import { cart__items } from "./cartPageSelectors.mjs";
import { setTotals } from "./setTotals.mjs";
import { verifyQuantity } from "./verifyQuantity.mjs";
/**
 *
 * @param {string} productID
 * @param {string} selectedColor
 * @param {number} selectedQuantity
 */
export const createItem = async (
  productID,
  selectedColor,
  selectedQuantity
) => {
  const { imageUrl, altText, name, price } = await fetchProductFromApi(
    productID
  );

  // Create the article section
  const article = document.createElement("article");
  article.setAttribute("class", "cart__item");
  article.setAttribute("data-id", productID);
  article.setAttribute("data-color", selectedColor);

  // Create the product image section
  const imgSection = document.createElement("div");
  imgSection.setAttribute("class", "cart__item__img");
  article.appendChild(imgSection);

  const img = document.createElement("img");
  img.setAttribute("src", imageUrl);
  img.setAttribute("alt", altText);
  imgSection.appendChild(img);

  const contentSection = document.createElement("div");
  contentSection.setAttribute("class", "cart__item__content");
  article.appendChild(contentSection);

  // Create the product description section
  const descriptionSection = document.createElement("div");
  descriptionSection.setAttribute("class", "cart__item__content__description");
  contentSection.appendChild(descriptionSection);

  const productName = document.createElement("h2");
  productName.textContent = name;
  descriptionSection.appendChild(productName);

  const productColor = document.createElement("p");
  productColor.textContent = selectedColor;
  descriptionSection.appendChild(productColor);

  const productPrice = document.createElement("p");
  productPrice.textContent = `${price}  €`;
  descriptionSection.appendChild(productPrice);

  // Create the product quantity and options section
  const settingSection = document.createElement("div");
  settingSection.setAttribute("class", "cart__item__content__settings");
  descriptionSection.appendChild(settingSection);

  const quantitySection = document.createElement("div");
  quantitySection.setAttribute(
    "class",
    "cart__item__content__settings__quantity"
  );
  settingSection.appendChild(quantitySection);

  const productQuantity = document.createElement("p");
  productQuantity.textContent = `Qté : ${selectedQuantity}`;
  quantitySection.appendChild(productQuantity);

  const quantityInput = document.createElement("input");
  quantityInput.setAttribute("type", "number");
  quantityInput.setAttribute("class", "itemQuantity");
  quantityInput.setAttribute("name", "itemQuantity");
  quantityInput.setAttribute("min", "1");
  quantityInput.setAttribute("max", "100");
  quantityInput.setAttribute("value", selectedQuantity);
  quantityInput.addEventListener("change", (e) => {
    const newQuantity = verifyQuantity(e.target.value);
    setCartItem(productID, selectedColor, newQuantity);
    quantityInput.setAttribute("value", newQuantity);
    productQuantity.textContent = `Qté : ${newQuantity}`;
    setTotals();
  });
  quantitySection.appendChild(quantityInput);

  // Create the delete section
  const deleteSection = document.createElement("div");
  deleteSection.setAttribute("class", "cart__item__content__settings__delete");
  settingSection.appendChild(deleteSection);

  const deleteAction = document.createElement("p");
  deleteAction.setAttribute("class", "deleteItem");
  deleteAction.textContent = "Supprimer";
  deleteSection.appendChild(deleteAction);
  deleteSection.addEventListener("click", () => {
    deleteCartItem(productID, selectedColor);
    setTotals();
    article.parentElement.removeChild(article);
  });
  cart__items.append(article);
};
