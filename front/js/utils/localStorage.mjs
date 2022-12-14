export const getCartItems = () =>
  JSON.parse(localStorage.getItem("cartItems")) || [];

// Create a product in local storage with its options
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

// Updates a given product with its new quantity
const updateCartItem = (selectedQuantity, savedItemIndex) => {
  const cartItems = getCartItems();
  const itemToUpdate = cartItems[savedItemIndex];

  const currentQuantity = Number(itemToUpdate.selectedQuantity);
  if (currentQuantity == 100) {
    alert(
      "Vous ne pouvez ajouter davantage de ce produit à votre panier - Quantité maximum autorisée : 100 exemplaires"
    );
    return;
  }

  const newQuantity = currentQuantity + Number(selectedQuantity);
  if (newQuantity > 100) {
    alert(
      `Vous ne pouvez ajouter plus de ${
        100 - currentQuantity
      } à votre panier - Quantité maximum autorisée : 100 exemplaires`
    );
    return;
  }

  itemToUpdate.selectedQuantity = newQuantity.toString();
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// Remove the product from the local storage
export const deleteCartItem = (productID, selectedColor) => {
  const cartItems = getCartItems();
  const indexOfTtemToDelete = getSavedItemIndex(productID, selectedColor);

  localStorage.setItem(
    "cartItems",
    JSON.stringify(
      cartItems.filter((item, index) => index !== indexOfTtemToDelete)
    )
  );
};

// Modify the options of a specified product
export const setCartItem = (productID, selectedColor, selectedQuantity) => {
  const currentCartItems = getCartItems();
  const savedItemIndex = getSavedItemIndex(productID, selectedColor);
  const itemToUpdate = currentCartItems[savedItemIndex];

  if (Number(selectedQuantity) > 100)
    return alert(
      "Vous ne pouvez ajouter davantage de ce produit à votre panier - Quantité maximum autorisée : 100 exemplaires"
    );

  if (Number(selectedQuantity) < 1)
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

// Decides wither to create or update the product
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
};

// Remove all product from the localStorage
export const cleanLocalStorage = () => localStorage.clear();
