// @ts-check

import { fetchProductFromApi } from "../utils/fetchProductFromApi.mjs";

export const generateHomePage = async () => {
  const items = document.querySelector("#items");

  /**
   *
   * @param {string} url
   * @param {string} itemImgUrl
   * @param {string} imgAltText
   * @param {string} itemName
   * @param {string} itemDescription
   * @returns Node
   */
  const createItem = (
    url,
    itemImgUrl,
    imgAltText,
    itemName,
    itemDescription
  ) => {
    const a = document.createElement("a");
    a.setAttribute("href", `./product.html?id=${url}`);

    const article = document.createElement("article");
    a.appendChild(article);

    const img = document.createElement("img");
    img.setAttribute("src", itemImgUrl);
    img.setAttribute("alt", imgAltText);
    article.appendChild(img);

    const name = document.createElement("h3");
    name.setAttribute("class", "productName");
    name.innerHTML = itemName;
    article.appendChild(name);

    const description = document.createElement("p");
    description.setAttribute("class", "productDescription");
    description.innerHTML = itemDescription;
    article.appendChild(description);

    return a;
  };

  const populatePageWithProducts = async () => {
    const getProductsFromAPI = await fetchProductFromApi();

    getProductsFromAPI.forEach((product) => {
      const productElement = createItem(
        product._id,
        product.imageUrl,
        product.altTxt,
        product.name,
        product.description
      );
      items?.appendChild(productElement);
    });
  };

  populatePageWithProducts();
};
