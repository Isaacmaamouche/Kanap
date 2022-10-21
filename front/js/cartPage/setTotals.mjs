import { fetchProductFromApi } from "../utils/fetchProductFromApi.mjs";
import { getCartItems } from "../utils/localStorage.mjs";
import { totalPrice, totalQuantity } from "./cartPageSelectors.mjs";

// Uses cart infos from localstorage to calculate and set total quantity and total price
export const setTotals = async () => {
  const cartItems = getCartItems();

  const totalItemQuantity = cartItems.reduce(
    (total, item) => total + Number(item.selectedQuantity),
    0
  );

  const totalItemPrice = await cartItems.reduce(async (total, item) => {
    const { price } = await fetchProductFromApi(item.productID);
    const prevTotal = await total;
    const itemPrice = price * Number(item.selectedQuantity);
    return prevTotal + itemPrice;
  }, 0);

  totalQuantity.textContent = totalItemQuantity;
  totalPrice.textContent = totalItemPrice;
};
