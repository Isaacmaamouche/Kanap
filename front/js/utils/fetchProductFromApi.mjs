import { productsAPIURL } from "./constants.mjs";

/**
 * @typedef {object} Product contains all the form's inputs
 * @property {string[]} colors
 * @property {string} _id name price imageUrl description altTxt
 * @property {string} name
 * @property {number} price
 * @property {string} imageUrl
 * @property {string} description
 * @property {string} altTxt
 */

/**
 * Calls the product API to retrieve
 * @param {string} [productID]
 * @returns {Product | Product[]}
 */
export const fetchProductFromApi = async (productID = "") => {
  return fetch(`${productsAPIURL}${productID}`)
    .then((res) => {
      if (!res.ok)
        return console.error("something went wrong when loading products");
      return res.json();
    })
    .catch((error) => console.error(error));
};
