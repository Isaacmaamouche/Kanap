import { orderIdElement } from "./confirmPage/confirmPageSelectors.mjs";
import { getOrderId } from "./confirmPage/getOrderId.mjs";

const populateConfirmPage = () => {
  const orderId = getOrderId();
  orderIdElement.innerHTML = orderId;
};

document.addEventListener("DOMContentLoaded", populateConfirmPage);
