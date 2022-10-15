import { postOrderAPIURL } from "../utils/constants.mjs";
import { cleanLocalStorage } from "../utils/localStorage.mjs";

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
