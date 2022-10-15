// @ts-check

import { productsAPIURL } from "./constants.mjs";

export const OLDfetchProduct = async (productID = "") => {
  // fetch(`${productsAPIURL}${productID}`)
  //   .then((res) => {
  //     if (!res.ok)
  //       return console.error("something went wrong when loading products");
  //     return res.json();
  //   })
  //   .then((data) => data)
  //   .catch((error) => console.error(error));

  try {
    const res = await fetch(`${productsAPIURL}${productID}`);
    if (!res.ok) console.error("something went wrong when loading products");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProductFromApi = async (productID = "") => {
  return fetch(`${productsAPIURL}${productID}`)
    .then((res) => {
      if (!res.ok)
        return console.error("something went wrong when loading products");
      return res.json();
    })
    .catch((error) => console.error(error));
};
