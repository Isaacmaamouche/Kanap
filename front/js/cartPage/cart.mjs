import { getCartItems } from "../utils/localStorage.mjs";
import { orderButton } from "./cartPageSelectors.mjs";
import { createItem } from "./createItem.mjs";
import { addFormValidators } from "./inputValidators.mjs";
import { orderButtonHandler } from "./orderButtonHandler.mjs";
import { setTotals } from "./setTotals.mjs";

export const generateCartPage = async () => {
  const cartItems = getCartItems();
  cartItems.forEach(({ productID, selectedColor, selectedQuantity }) =>
    createItem(productID, selectedColor, selectedQuantity)
  );
  setTotals();
  addFormValidators();
  orderButton.addEventListener("click", orderButtonHandler);
};
