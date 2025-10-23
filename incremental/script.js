// ========== Game Variables ==========
let leaves = 0;
let leafValue = 1;
let spawnRate = 1; // leaves per second
let maxLeaves = 20;
let passiveRate = 0;

let spawnCost = 10;
let valueCost = 25;
let capCost = 50;
let passiveCost = 100;

const leafArea = document.getElementById("leaf-area");
const leafCountDisplay = document.getElementById("leafCount");
const leafValueDisplay = document.getElementById("leafValue");

// Leaf types with individual values
const leafTypes = [
  { src: "incremental/assets/leaf1.png", value: 1 },
  { src: "incremental/assets/leaf2.png", value: 3 },
  { src: "incremental/assets/leaf3.png", value: 10 },
];

// ========== Save & Load ==========
function saveGame() {
  const data = {
    leaves,
    leafValue,
    spawnRate,
    maxLeaves,
    passiveRate,
    spawnCost,
    valueCost,
    capCost,
    passiveCost
  };
  localStorage.setItem("leafClickerSave", JSON.stringify(data));
}

function loadGame() {
  const data = JSON.parse(localStorage.getItem("leafClickerSave"));
  if (data) {
    leaves = data.leaves || 0;
    leafValue = data.leafValue || 1;
    spawnRate = data.spawnRate || 1;
    maxLeaves = data.maxLeaves || 20;
    passiveRate = data.passiveRate || 0;
    spawnCost = data.spawnCost || 10;
    valueCost = data.valueCost || 25;
    capCost = data.capCost || 50;
    passiveCost = data.passiveCost || 100;
  }
  updateUI();







