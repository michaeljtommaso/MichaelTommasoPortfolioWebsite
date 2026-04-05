import { facts, factsFunction } from "./facts.js"

const randomFactPage = document.getElementById("facts-list");
const randomNum = Math.round(Math.random() * facts.length);

randomFactPage.appendChild(factsFunction(randomNum));