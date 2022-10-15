//https://www.makeuseof.com/regular-expressions-form-validation-html-javascript/
//https://code.tutsplus.com/tutorials/form-input-validation-using-only-html5-and-regex--cms-33095

import { getCartItems } from "../utils/localStorage.mjs";
import {
  firstNameInput,
  lastNameInput,
  addressInput,
  cityInput,
  emailInput,
  orderButton,
  firstNameErrorMsg,
  lastNameErrorMsg,
  addressErrorMsg,
  cityErrorMsg,
  emailErrorMsg,
} from "./cartPageSelectors.mjs";
import { createOrder } from "./createOrder.mjs";

import {
  addEmailValidator,
  addValidator,
  emailIsValid,
  inputIsValid,
} from "./inputValidators.mjs";

export const addFormValidators = () => {
  addEmailValidator(emailInput, emailErrorMsg);
  addValidator(firstNameInput, firstNameErrorMsg);
  addValidator(lastNameInput, lastNameErrorMsg);
  addValidator(addressInput, addressErrorMsg);
  addValidator(cityInput, cityErrorMsg);
};

const allFieldsAreValid = ({ email, firstName, lastName, address, city }) => {
  return (
    emailIsValid(email) &&
    inputIsValid(firstName) &&
    inputIsValid(lastName) &&
    inputIsValid(address) &&
    inputIsValid(city)
  );
};

const postOrder = async (e) => {
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

  const areFieldsAreValid = allFieldsAreValid(contact);
  if (!areFieldsAreValid)
    alert("Merci de correctement renseigner tous les champs du formulaire.");

  createOrder(contact, products);
};

orderButton.addEventListener("click", postOrder);
