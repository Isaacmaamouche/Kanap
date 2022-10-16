import { getCartItems } from "../utils/localStorage.mjs";
import {
  firstNameInput,
  lastNameInput,
  addressInput,
  cityInput,
  emailInput,
} from "./cartPageSelectors.mjs";
import { createOrder } from "./createOrder.mjs";

import { allInputsAreValid } from "./inputValidators.mjs";

/**
 * Checks if the following conditions is valid to post the order
 * IF all form inputs are valid
 * IF the cart is not empty
 * @param {Event} e
 */
export const orderButtonHandler = async (e) => {
  console.log(typeof e);
  e.preventDefault();

  const products = getCartItems().map((item) => item.productID);
  if (products.length == 0) return alert("Votre panier est vide !");

  const contact = {
    firstName: firstNameInput.value.trim(),
    lastName: lastNameInput.value.trim(),
    address: addressInput.value.trim(),
    city: cityInput.value.trim(),
    email: emailInput.value.trim(),
  };

  if (!allInputsAreValid(contact))
    return alert(
      "Merci de correctement renseigner tous les champs du formulaire."
    );

  createOrder(contact, products);
};
