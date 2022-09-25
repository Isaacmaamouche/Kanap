import { homeTestScript } from "./elementSelectors/home.mjs";

const mainScript = () => {
  homeTestScript();
};

document.addEventListener("DOMContentLoaded", mainScript);
