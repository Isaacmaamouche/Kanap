export const getCartItems = () =>
  JSON.parse(localStorage.getItem("cartItems")) || [];

const createCartItem = (productID, selectedColor, selectedQuantity) => {
  const currentCartItem = getCartItems();

  const newCartItem = {
    productID: productID,
    productVariants: [
      { selectedColor: selectedColor, selectedQuantity: selectedQuantity },
    ],
  };

  localStorage.setItem(
    "cartItems",
    JSON.stringify([...currentCartItem, newCartItem])
  );
};

const updateCartItem = (selectedColor, selectedQuantity, savedItemIndex) => {
  const currentCartItem = getCartItems();

  const itemVariantIndex = currentCartItem[
    savedItemIndex
  ].productVariants.findIndex(
    (variant) => variant.selectedColor == selectedColor
  );

  if (itemVariantIndex == -1) {
    currentCartItem[savedItemIndex].productVariants.push({
      selectedColor: selectedColor,
      selectedQuantity: selectedQuantity,
    });
    localStorage.setItem("cartItems", JSON.stringify(currentCartItem));
    return;
  }

  const itemVariant =
    currentCartItem[savedItemIndex].productVariants[itemVariantIndex];
  const currentQuantity = itemVariant.selectedQuantity;

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
  itemVariant.selectedQuantity = newQuantity;
  localStorage.setItem("cartItems", JSON.stringify(currentCartItem));
};

export const setCartItem = (selectedQuantity, selectedColor, productID) => {
  const currentCartItem = getCartItems();
  const savedItemIndex = getSavedItemIndex(productID);
  const itemVariantIndex = currentCartItem[
    savedItemIndex
  ].productVariants.findIndex(
    (variant) => variant.selectedColor == selectedColor
  );

  const itemVariant =
    currentCartItem[savedItemIndex].productVariants[itemVariantIndex];
  const currentQuantity = itemVariant.selectedQuantity;

  if (selectedQuantity == 100) {
    alert(
      "Vous ne pouvez ajouter davantage de ce produit à votre panier - Quantité maximum autorisée : 100 exemplaires"
    );
    return;
  }

  const newQuantity = selectedQuantity;

  if (newQuantity > 100) {
    alert(
      `Vous ne pouvez ajouter plus de ${
        100 - currentQuantity
      } à votre panier - Quantité maximum autorisée : 100 exemplaires`
    );
    return;
  }
  itemVariant.selectedQuantity = newQuantity;
  localStorage.setItem("cartItems", JSON.stringify(currentCartItem));
};

const getSavedItemIndex = (id) => {
  const currentCartItem = getCartItems();
  return currentCartItem.findIndex((item) => item.productID == id);
};

export const saveToLocalStorage = (
  productID,
  selectedColor,
  selectedQuantity
) => {
  const savedItemIndex = getSavedItemIndex(productID);
  if (savedItemIndex > -1) {
    updateCartItem(selectedColor, selectedQuantity, savedItemIndex);
  } else {
    createCartItem(productID, selectedColor, selectedQuantity);
  }
  console.log(getCartItems());
};
