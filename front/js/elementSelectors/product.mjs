import { fetchProduct } from "../fetchProduct.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productID = urlParams.get("id");

const productFromAPI = await fetchProduct(productID);
console.log(productFromAPI);

const itemImg = document.querySelector(".item__img");
const img = document.createElement("img");
img.setAttribute("src", productFromAPI.imageUrl);
img.setAttribute("alt", productFromAPI.altTxt);
itemImg.appendChild(img);

const title = document.querySelector("#title");
title.innerHTML = productFromAPI.name;

const price = document.querySelector("#price");
price.innerHTML = productFromAPI.price;

const description = document.querySelector("#description");
description.innerHTML = productFromAPI.description;

const select = document.querySelector("#colors");

productFromAPI.colors.forEach((color) => {
  const option = document.createElement("option");
  option.setAttribute("value", color);
  option.innerHTML = color;
  select.appendChild(option);
});
