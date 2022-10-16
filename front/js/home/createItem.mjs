/**
 * Creates all the html element for a given item and appends it to the cart
 * @param {string} url
 * @param {string} itemImgUrl
 * @param {string} imgAltText
 * @param {string} itemName
 * @param {string} itemDescription
 * @returns Node
 */
export const createItem = (
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
