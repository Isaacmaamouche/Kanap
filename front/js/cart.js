import { generateCartPage } from "./cartPage/cart.mjs";
import { formValidation } from "./cartPage/confirm.mjs";

const cartPageHandlers = () => {
  generateCartPage();
  formValidation();
};

document.addEventListener("DOMContentLoaded", cartPageHandlers);
