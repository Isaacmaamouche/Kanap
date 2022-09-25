import { productsAPI } from "./constants.mjs";

export const fetchProduct = async (productID = "") => {
  try {
    const res = await fetch(`${productsAPI}${productID}`);
    if (!res.ok) console.error("something went wrong when loading products");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
