const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchForm = document.getElementById("search-form");

const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

searchForm.addEventListener("submit", checkBtn);

function checkBtn(event) {
    event.preventDefault(); // stop le reload

    const inputValue = searchInput.value.trim().toLowerCase();
    if (!inputValue) {
        return alert("Please enter a creature name or ID");
    }


    fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${inputValue}`)
      .then(res => {
        if (!res.ok) throw new Error("Creature not found");
        return res.json();
      })
      .then(creature => {
        creatureName.textContent = creature.name.toUpperCase();
        creatureId.textContent = `#${creature.id}`;
        weight.textContent = `Weight: ${creature.weight}`;
        height.textContent = `Height: ${creature.height}`;

        hp.textContent = creature.stats.find(s => s.name === "hp").base_stat;
        attack.textContent = creature.stats.find(s => s.name === "attack").base_stat;
        defense.textContent = creature.stats.find(s => s.name === "defense").base_stat;
        specialAttack.textContent = creature.stats.find(s => s.name === "special-attack").base_stat;
        specialDefense.textContent = creature.stats.find(s => s.name === "special-defense").base_stat;
        speed.textContent = creature.stats.find(s => s.name === "speed").base_stat;

        // Affichage des types
        types.textContent = "";
        creature.types.forEach(t => {
          const span = document.createElement("span");
          span.textContent = t.name.toUpperCase();
          span.classList.add(t.name.toLowerCase()); // pour la couleur CSS
          types.appendChild(span);
        });
      })
      .catch(err => alert(err.message));
  }
