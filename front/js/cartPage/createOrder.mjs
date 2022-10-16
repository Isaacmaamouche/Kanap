import { postOrderAPIURL } from "../utils/constants.mjs";
import { cleanLocalStorage } from "../utils/localStorage.mjs";

/**
 * @typedef {object} Contact contains all the form's inputs
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} address
 * @property {string} city
 * @property {string} email
 */

/**
 * Post the order informations to the API
 * Then clean the cart
 * Then redirects to the confirm page with the orderId as a url param
 * @param {Contact} contact
 * @param {string[]} products
 */
export const createOrder = async (contact, products) => {
  const response = await fetch(postOrderAPIURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contact, products }),
  });

  if (response.ok) {
    const result = await response.json();
    cleanLocalStorage();
    window.location = `./confirmation.html?orderId=${result.orderId}`;
  } else {
    alert("Une erreur s'est produite lors de la commande, veuillez réessayer.");
  }
};
