import { fetchProductFromApi } from "../utils/fetchProductFromApi.mjs";
import {
  deleteCartItem,
  getCartItems,
  setCartItem,
} from "../utils/localStorage.mjs";

const setTotals = async () => {
  const totalQuantity = document.querySelector("#totalQuantity");
  const totalPrice = document.querySelector("#totalPrice");
  const cartItems = getCartItems();

  let totalItemQuantity = 0;
  let totalItemPrice = 0;

  cartItems?.forEach(async (item) => {
    const { price } = await fetchProductFromApi(item.productID);

    totalItemQuantity = item.productVariants.reduce(
      (total, variant) => total + variant.selectedQuantity,
      totalItemQuantity
    );
    totalItemPrice = item.productVariants.reduce(
      (total, variant) => total + price * variant.selectedQuantity,
      totalItemPrice
    );
    totalQuantity.innerHTML = totalItemQuantity;
    totalPrice.innerHTML = totalItemPrice;
  });
};

export const generateCartPage = async () => {
  const cartItems = getCartItems();
  console.log("cartItems : ", cartItems);

  const createItem = async ({ productID, productVariants }) => {
    const { imageUrl, altText, name, price } = await fetchProductFromApi(
      productID
    );
    const cart__items = document.querySelector("#cart__items");

    //Create the article section
    const article = document.createElement("article");
    article.setAttribute("class", "cart__item");
    article.setAttribute("data-id", productID);
    // article.setAttribute("data-color", selectedColor);
    //TODO Le html presente un attribut data-color par article, or je ne ddois afficher qu'une fois un produit et lister les variants

    //TODO onClick pour delete la variant (productID, productVariant)
    //TODO each must update the totals

    //Create the product image section
    const imgSection = document.createElement("div");
    imgSection.setAttribute("class", "cart__item__img");
    article.appendChild(imgSection);

    const img = document.createElement("img");
    img.setAttribute("src", imageUrl);
    img.setAttribute("alt", altText);
    imgSection.appendChild(img);

    const contentSection = document.createElement("div");
    contentSection.setAttribute("class", "cart__item__content");
    article.appendChild(contentSection);

    //Create the product description section
    const descriptionSection = document.createElement("div");
    descriptionSection.setAttribute(
      "class",
      "cart__item__content__description"
    );
    contentSection.appendChild(descriptionSection);

    const productName = document.createElement("h2");
    productName.innerHTML = name;
    descriptionSection.appendChild(productName);

    productVariants.forEach((variant) => {
      const { selectedColor, selectedQuantity } = variant;

      const productColor = document.createElement("p");
      productColor.innerHTML = selectedColor;
      descriptionSection.appendChild(productColor);

      const productPrice = document.createElement("p");
      productPrice.innerHTML = `${price}  €`;
      descriptionSection.appendChild(productPrice);

      //Create the product quantity and options section
      const settingSection = document.createElement("div");
      settingSection.setAttribute("class", "cart__item__content__settings");
      descriptionSection.appendChild(settingSection);

      const quantitySection = document.createElement("div");
      quantitySection.setAttribute(
        "class",
        "cart__item__content__settings__quantity"
      );
      settingSection.appendChild(quantitySection);

      const productQuantity = document.createElement("p");
      productQuantity.innerHTML = `Qté : ${selectedQuantity}`;
      quantitySection.appendChild(productQuantity);

      const quantityInput = document.createElement("input");
      quantityInput.setAttribute("type", "number");
      quantityInput.setAttribute("class", "itemQuantity");
      quantityInput.setAttribute("name", "itemQuantity");
      quantityInput.setAttribute("min", "1");
      quantityInput.setAttribute("max", "100");
      quantityInput.setAttribute("value", selectedQuantity);
      quantityInput.addEventListener("change", (e) => {
        const prevValue = selectedQuantity;
        if (e.target.value > 100) {
          quantityInput.setAttribute("value", prevValue);
          //FIXME Reset input value doesn't work
          alert(
            "Vous ne pouvez pas commander plus de 100 articles pour ce produit"
          );
          return;
        }
        setCartItem(Number(e.target.value), selectedColor, productID);
        quantityInput.setAttribute("value", e.target.value);
        productQuantity.innerHTML = `Qté : ${e.target.value}`;
        setTotals();
      });
      quantitySection.appendChild(quantityInput);

      //Create the delete section
      const deleteSection = document.createElement("div");
      deleteSection.setAttribute(
        "class",
        "cart__item__content__settings__delete"
      );
      settingSection.appendChild(deleteSection);

      const deleteAction = document.createElement("p");
      deleteAction.setAttribute("class", "deleteItem");
      deleteAction.innerHTML = "Supprimer";
      deleteSection.appendChild(deleteAction);
      deleteSection.addEventListener("click", (e) => {
        deleteCartItem(productID, selectedColor);
        setTotals();
        article.parentElement.removeChild(article);
      });
    });

    cart__items.append(article);
  };

  cartItems.forEach((item) => createItem(item));
  setTotals();

  const deleteVariant = (productID, selectedVariant) => {};
};
