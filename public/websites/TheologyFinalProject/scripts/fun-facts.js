import { facts, factsFunction } from './facts.js'

const factsList = document.getElementById("facts-list");
const randomFactGenerator = document.getElementById("random-fact-generator");

for (let i = 0; i < facts.length; i++) {
    factsList.appendChild(factsFunction(i));
}

randomFactGenerator.addEventListener("click", () => {
    window.location.href = "random-fact.html"
})    
