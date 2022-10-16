import { orderIdElement } from "./confirmPageSelectors.mjs";

export const displayOrderId = () => {
  const currentUrl = window.location.search;
  const urlParams = new URLSearchParams(currentUrl);
  const orderId = urlParams.get("orderId");
  orderIdElement.innerHTML = orderId;
};
