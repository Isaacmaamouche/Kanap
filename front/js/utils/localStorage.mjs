export const getCartItems = () =>
  JSON.parse(localStorage.getItem("cartItems")) || [];

const createCartItem = (productID, selectedColor, selectedQuantity) => {
  const currentCartItem = getCartItems();

  const newCartItem = {
    productID: productID,
    selectedColor: selectedColor,
    selectedQuantity: selectedQuantity,
  };

  localStorage.setItem(
    "cartItems",
    JSON.stringify([...currentCartItem, newCartItem])
  );
};

const updateCartItem = (selectedQuantity, savedItemIndex) => {
  const cartItems = getCartItems();
  const itemToUpdate = cartItems[savedItemIndex];

  const currentQuantity = itemToUpdate.selectedQuantity;
  if (currentQuantity == 100) {
    alert(
      "Vous ne pouvez ajouter davantage de ce produit à votre panier - Quantité maximum autorisée : 100 exemplaires"
    );
    return;
  }

  const newQuantity = currentQuantity + selectedQuantity;
  if (newQuantity > 100) {
    alert(
      `Vous ne pouvez ajouter plus de ${
        100 - currentQuantity
      } à votre panier - Quantité maximum autorisée : 100 exemplaires`
    );
    return;
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const deleteCartItem = (productID, selectedColor) => {
  const cartItems = getCartItems();
  const indexOfTtemToDelete = getSavedItemIndex(productID, selectedColor);

  localStorage.setItem("cartItems", JSON.stringify(cartItems.filter()));
};

export const setCartItem = (productID, selectedColor, selectedQuantity) => {
  const currentCartItems = getCartItems();
  const savedItemIndex = getSavedItemIndex(productID, selectedColor);
  const itemToUpdate = currentCartItems[savedItemIndex];

  if (selectedQuantity > 100)
    return alert(
      "Vous ne pouvez ajouter davantage de ce produit à votre panier - Quantité maximum autorisée : 100 exemplaires"
    );

  if (selectedQuantity < 1)
    return alert(
      "Vous ne pouvez ajouter davantage de ce produit à votre panier - Quantité maximum autorisée : 100 exemplaires"
    );

  itemToUpdate.selectedQuantity = selectedQuantity;
  localStorage.setItem("cartItems", JSON.stringify(currentCartItems));
};

const getSavedItemIndex = (id, selectedColor) => {
  const currentCartItem = getCartItems();
  return currentCartItem.findIndex(
    (item) => item.productID == id && item.selectedColor == selectedColor
  );
};

export const saveToLocalStorage = (
  productID,
  selectedColor,
  selectedQuantity
) => {
  const savedItemIndex = getSavedItemIndex(productID, selectedColor);
  if (savedItemIndex > -1) {
    updateCartItem(selectedQuantity, savedItemIndex);
  } else {
    createCartItem(productID, selectedColor, selectedQuantity);
  }
  console.log(getCartItems());
};
