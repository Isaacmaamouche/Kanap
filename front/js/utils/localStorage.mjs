export const getCartItems = () =>
  JSON.parse(localStorage.getItem("cartItems")) || [];

const getSavedItemIndex = (id, selectedColor) => {
  return getCartItems().findIndex(
    (item) => item.productID == id && item.selectedColor == selectedColor
  );
};

const createCartItem = (product) => {
  localStorage.setItem(
    "cartItems",
    JSON.stringify([...getCartItems(), product])
  );
};

const updateCartItem = (quantity, savedItemIndex) => {
  const cartItems = getCartItems();
  const savedItem = cartItems[savedItemIndex];
  const currentQuantity = Number(savedItem.selectedQuantity);

  if (currentQuantity == 100) {
    alert(
      "Vous ne pouvez ajouter davantage de ce produit à votre panier - Quantité maximum autorisée : 100 exemplaires"
    );
    return;
  }
  const newQuantity = Number(savedItem.selectedQuantity) + Number(quantity);

  if (newQuantity > 100) {
    alert(
      `Vous ne pouvez ajouter plus de ${
        100 - currentQuantity
      } à votre panier - Quantité maximum autorisée : 100 exemplaires`
    );
    return;
  }
  cartItems[savedItemIndex] = {
    ...savedItem,
    selectedQuantity: newQuantity,
  };
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const saveToLocalStorage = (product) => {
  const { productID, selectedColor, selectedQuantity } = product;
  const savedItemIndex = getSavedItemIndex(productID, selectedColor);
  if (savedItemIndex > -1) {
    updateCartItem(selectedQuantity, savedItemIndex);
  } else {
    createCartItem(product);
  }
};
