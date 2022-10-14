import { saveToLocalStorage } from "../utils/localStorage.mjs";

export const addToCart = (productID, selectedColor, selectedQuantity) => {
  if (selectedColor && selectedQuantity > 0) {
    saveToLocalStorage(productID, selectedColor, selectedQuantity);
  } else if (!selectedColor) {
    alert("Vous devez choisir une couleur");
  } else if (selectedQuantity == 0) {
    alert("Vous devez choisir une quantité");
  }
};
