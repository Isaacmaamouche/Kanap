export const getOrderId = () => {
  const currentUrl = window.location.search;
  const urlParams = new URLSearchParams(currentUrl);
  return urlParams.get("orderId");
};
