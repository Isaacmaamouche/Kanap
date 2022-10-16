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

export const orderButtonHandler = async (e) => {
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
