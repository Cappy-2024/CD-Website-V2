// ========== Game Variables ==========
let leaves = 0;
let leafValue = 1;
let spawnRate = 1; // leaves per second
let maxLeaves = 20;
let passiveLevel = 0; // new system replaces passiveRate

let spawnCost = 10;
let valueCost = 25;
let capCost = 50;
let passiveCost = 100;

// passive collection speed (seconds per collect)
let passiveInterval = 1500; // starts at 1.5 seconds (in ms)

// ========== Save & Load ==========
function saveGame() {
  const data = {
    leaves,
    leafValue,
    spawnRate,
    maxLeaves,
    passiveLevel,
    spawnCost,
    valueCost,
    capCost,
    passiveCost,
    passiveInterval
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
    passiveLevel = data.passiveLevel || 0;
    spawnCost = data.spawnCost || 10;
    valueCost = data.valueCost || 25;
    capCost = data.capCost || 50;
    passiveCost = data.passiveCost || 100;
    passiveInterval = data.passiveInterval || 1500;
  }
  updateUI();
}

window.addEventListener("beforeunload", saveGame);
window.addEventListener("load", loadGame);

// ========== UI ==========
function updateUI() {
  leafCountDisplay.textContent = Math.floor(leaves);
  leafValueDisplay.textContent = leafValue.toFixed(2);
  document.getElementById("spawnCost").textContent = spawnCost;
  document.getElementById("valueCost").textContent = valueCost;
  document.getElementById("capCost").textContent = capCost;
  document.getElementById("passiveCost").textContent = passiveCost;
}

// ========== Passive Leaf Collection ==========
let passiveCollector;
function startPassiveCollector() {
  if (passiveCollector) clearInterval(passiveCollector);
  if (passiveLevel <= 0) return;

  passiveCollector = setInterval(() => {
    const leavesOnScreen = document.querySelectorAll(".leaf");
    if (leavesOnScreen.length > 0) {
      // Collect a random leaf automatically
      const randomLeaf = leavesOnScreen[Math.floor(Math.random() * leavesOnScreen.length)];
      if (randomLeaf) {
        leaves += parseInt(randomLeaf.dataset.value);
        randomLeaf.remove();
        updateUI();
      }
    }
  }, passiveInterval);
}

// ========== Upgrades ==========
document.getElementById("upgradeSpawn").addEventListener("click", () => {
  if (leaves >= spawnCost) {
    leaves -= spawnCost;
    spawnRate += 1;
    spawnCost = Math.floor(spawnCost * 1.6);
    updateUI();
  }
});

// 💎 New scalable leaf value formula
// Each upgrade boosts leafValue by 15% (multiplicative)
document.getElementById("upgradeValue").addEventListener("click", () => {
  if (leaves >= valueCost) {
    leaves -= valueCost;
    leafValue *= 1.15; // 15% stronger each upgrade
    leafTypes.forEach((lt, i) => {
      lt.value = Math.floor(lt.value * 1.15 + i); // scale type values too
    });
    valueCost = Math.floor(valueCost * 1.7);
    updateUI();
  }
});

document.getElementById("upgradeCap").addEventListener("click", () => {
  if (leaves >= capCost) {
    leaves -= capCost;
    maxLeaves += 10;
    capCost = Math.floor(capCost * 1.5);
    updateUI();
  }
});

// 🌿 New "Passive Collection" upgrade
document.getElementById("upgradePassive").addEventListener("click", () => {
  if (leaves >= passiveCost) {
    leaves -= passiveCost;
    passiveLevel++;

    // Speed curve: each level reduces interval by 10%, capped at 0.25s
    passiveInterval = Math.max(250, passiveInterval * 0.9);

    passiveCost = Math.floor(passiveCost * 2);
    updateUI();
    startPassiveCollector();
  }
});






