export const verifyQuantity = (inputValue) => {
  if (inputValue > 100) {
    inputValue = 100;
    alert("Vous ne pouvez pas commander plus de 100 articles pour ce produit");
  }
  if (inputValue < 1) {
    inputValue = 1;
    alert("Vous ne pouvez pas commander moins d'un article pour ce produit");
  }
  return inputValue;
};
