const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productID = urlParams.get("id");
console.log(productID);
