import { generateCartPage } from "./cartPage/cart.mjs";
import { addFormValidators } from "./cartPage/confirm.mjs";

const cartPageHandlers = () => {
  generateCartPage();
  addFormValidators();
};

document.addEventListener("DOMContentLoaded", cartPageHandlers);
