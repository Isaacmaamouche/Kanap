import {
  addressInput,
  cityInput,
  emailInput,
  firstNameInput,
  lastNameInput,
} from "./cartPageSelectors.mjs";

export const emailIsValid = (inputValue) => {
  const emailPattern =
    /[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]*/;
  return emailPattern.test(inputValue);
};

export const inputIsValid = (inputValue) => {
  //Pas de caractères spéciaux, séparateurs acceptés
  const pattern =
    /((?:\w|[ ]|[\-_ ](?![\-_])|[\u00C0\u00C1\u00C2\u00C3\u00C4\u00C5\u00C6\u00C7\u00C8\u00C9\u00CA\u00CB\u00CC\u00CD\u00CE\u00CF\u00D0\u00D1\u00D2\u00D3\u00D4\u00D5\u00D6\u00D8\u00D9\u00DA\u00DB\u00DC\u00DD\u00DF\u00E0\u00E1\u00E2\u00E3\u00E4\u00E5\u00E6\u00E7\u00E8\u00E9\u00EA\u00EB\u00EC\u00ED\u00EE\u00EF\u00F0\u00F1\u00F2\u00F3\u00F4\u00F5\u00F6\u00F9\u00FA\u00FB\u00FC\u00FD\u00FF\u0153])+)/;
  return pattern.test(inputValue);
};

export const addValidator = (inputElement, errorMsgElement) => {
  inputElement.addEventListener("blur", () => {
    if (inputElement.value.trim().length == 0) return;
    if (inputIsValid(inputElement.value.trim())) {
      errorMsgElement.innerHTML = "";
    } else {
      errorMsgElement.innerHTML =
        "Ce champs ne peut contenir de caratères spéciaux.";
    }
  });
};

export const addEmailValidator = (emailElement, errorMsgElement) => {
  emailElement.addEventListener("blur", () => {
    if (emailElement.value.trim().length == 0) return;
    if (emailIsValid(emailElement.value.trim())) {
      errorMsgElement.innerHTML = "";
    } else {
      errorMsgElement.innerHTML =
        "Veuillez renseigner une adresse email valide.";
    }
  });
};

export const allInputsAreValid = ({
  email,
  firstName,
  lastName,
  address,
  city,
}) => {
  return (
    emailIsValid(email) &&
    inputIsValid(firstName) &&
    inputIsValid(lastName) &&
    inputIsValid(address) &&
    inputIsValid(city)
  );
};

export const addFormValidators = () => {
  addEmailValidator(emailInput, emailErrorMsg);
  addValidator(firstNameInput, firstNameErrorMsg);
  addValidator(lastNameInput, lastNameErrorMsg);
  addValidator(addressInput, addressErrorMsg);
  addValidator(cityInput, cityErrorMsg);
};
