import {
    renderProject,
    toggleTemperature
} from "./domHandler.js";

import "./style.css";

const btn = document.querySelector("#btn");
const unitToggle = document.querySelector("#unit-toggle");


btn.addEventListener("click", () => {
    renderProject();
});


unitToggle.addEventListener("click", () => {
    toggleTemperature();
});