import { orderIdElement } from "./confirmPageSelectors.mjs";

// Retrieve the orderId from th url to display it in the success message
export const displayOrderId = () => {
  const currentUrl = window.location.search;
  const urlParams = new URLSearchParams(currentUrl);
  const orderId = urlParams.get("orderId");
  orderIdElement.textContent = orderId;
};
