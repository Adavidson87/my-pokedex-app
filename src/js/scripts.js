let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=251";
  let modalContainer = document.querySelector("#modal-container");

  //Gets pokemon from the pokemon list array
  function getAll() {
    return pokemonList;
  }

  //adds pokemon to list if the pokemon is an object with correct keys
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  //retrieves details from pokemon list items
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.id = details.id;
        item.weight = details.weight;
        item.abilities = details.abilities;
        item.moves = details.moves;
        item.stats = details.stats;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //makes details available to be displayed in modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //turns pokemon into viewable list items that can be clicked on to open modal with details
  function addListItem(pokemon) {
    let pokemonListGroup = document.querySelector(".pokemon-list");

    let pokemonListElement = document.createElement("li");
    pokemonListElement.classList.add("lsit-group-item");

    let button = document.createElement("btn");
    button.innerText = pokemon.name.toUpperCase();
    button.classList.add("button-class");
    button.setAttribute("id", "show-modal");
    button.setAttribute("type", "button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#modal-container");
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });

    pokemonListElement.appendChild(button);
    pokemonListGroup.appendChild(pokemonListElement);
  }

  //retrieves pokemon data from api and adds to pokemon list array
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //opens modal and displays information about selected pokemon
  function showModal(pokemon) {
    let pokemonId = document.querySelector(".pokemon-id");
    pokemonId.innerText = "#" + pokemon.id;

    let pokemonName = document.querySelector(".pokemon-name");
    pokemonName.innerText =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    let pokemonImage = document.querySelector(".pokemon-image");
    pokemonImage.src = pokemon.imageUrl;

    let pokemonHeight = document.querySelector(".pokemon-height");
    pokemonHeight.innerText = "Height: " + pokemon.height / 10 + " m";

    let pokemonWeight = document.querySelector(".pokemon-weight");
    pokemonWeight.innerText = "Weight: " + pokemon.weight / 10 + "kgs";

    let itemTypes = "";
    pokemon.types.forEach(function (types) {
      itemTypes += ["<li>" + types.type.name + "</li>"];
    });
    let pokemonTypes = document.querySelector(".pokemon-types");
    pokemonTypes.innerHTML = itemTypes;

    let itemAbilities = "";
    pokemon.abilities.forEach(function (abilities) {
      itemAbilities += ["<li>" + abilities.ability.name + "</li>"];
    });
    let pokemonAbilities = document.querySelector(".pokemon-abilities");
    pokemonAbilities.innerHTML = itemAbilities;

    let itemMoves = "";
    pokemon.moves.forEach(function (moves) {
      itemMoves += ["<li>" + moves.move.name + "</li>"];
    });
    let pokemonMoves = document.querySelector(".pokemon-moves");
    pokemonMoves.innerHTML = itemMoves;

    let itemStatsName = "";
    pokemon.stats.forEach(function (stats) {
      itemStatsName += ["<li>" + stats.stat.name + "</li>"];
    });
    let pokemonStatsName = document.querySelector(".pokemon-stats-name");
    pokemonStatsName.innerHTML = itemStatsName;

    let itemStats = "";
    pokemon.stats.forEach(function (stats) {
      itemStats += ["<li>" + stats.base_stat + "</li>"];
    });
    let pokemonStats = document.querySelector(".pokemon-stats");
    pokemonStats.innerHTML = itemStats;
  }

  //searchbar functionality, filters pokemon as you type
  document.getElementById("search-input").addEventListener("input", (e) => {
    let searchInput = e.target.value;
    let buttons = document.getElementsByClassName("button-class");

    for (let i = 0; i < buttons.length; i++) {
      let btnText = buttons[i].innerText;
      if (!btnText.toLowerCase().includes(searchInput.toLowerCase())) {
        buttons[i].parentNode.style.display = "none";
      } else {
        buttons[i].parentNode.style.display = "block";
      }
    }
  });

  return {
    getAll: getAll,
    add: add,
    loadDetails: loadDetails,
    showDetails: showDetails,
    addListItem: addListItem,
    loadList: loadList,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
