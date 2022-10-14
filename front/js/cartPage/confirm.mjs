//https://www.makeuseof.com/regular-expressions-form-validation-html-javascript/
//https://code.tutsplus.com/tutorials/form-input-validation-using-only-html5-and-regex--cms-33095

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

import {
  addEmailValidator,
  addValidator,
  emailIsValid,
  inputIsValid,
} from "./inputValidators.mjs";

export const formValidation = () => {
  addEmailValidator(emailInput, emailErrorMsg);
  addValidator(firstNameInput, firstNameErrorMsg);
  addValidator(lastNameInput, lastNameErrorMsg);
  addValidator(addressInput, addressErrorMsg);
  addValidator(cityInput, cityErrorMsg);
};

const postOrder = (e) => {
  const allFieldsAreValid =
    emailIsValid(emailInput.value.trim()) &&
    inputIsValid(firstNameInput.value.trim()) &&
    inputIsValid(lastNameInput.value.trim()) &&
    inputIsValid(addressInput.value.trim()) &&
    inputIsValid(cityInput.value.trim());
  if (allFieldsAreValid) {
    //TODO post order
  } else {
    e.preventDefault();
  }
};

orderButton.addEventListener("click", postOrder);
