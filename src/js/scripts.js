let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=25";

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
        // item.imageUrl = details.sprites.front_default;
        item.imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + details.id + ".png";
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
    loadDetails(pokemon).then(function () {
    let pokemonListGroup = document.querySelector(".pokemon-list");

     let pokemonListElement = document.createElement("li");
    pokemonListElement.classList.add("list-group-item");

    let buttonImage = document.createElement("img");
    buttonImage.classList.add("button-image");
    buttonImage.setAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemon.id + ".png");

    let buttonName = document.createElement("h5");
    buttonName.classList.add("button-name")
    buttonName.innerText = "#" + pokemon.id + " " + pokemon.name.toUpperCase();

    let button = document.createElement("btn");
    button.classList.add("button-class");
    button.setAttribute("id", "show-modal");
    button.setAttribute("type", "button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#modal-container");

    

    button.addEventListener("click", function (event) {
      backgroundColor(pokemon);
      showDetails(pokemon);
    });

    pokemonListElement.appendChild(button);
    pokemonListGroup.appendChild(pokemonListElement);
    button.appendChild(buttonImage);
    button.appendChild(buttonName);
  })
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
    pokemonName.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    let pokemonImage = document.querySelector(".pokemon-image");
    pokemonImage.src = pokemon.officialArtwork;

    let pokemonHeight = document.querySelector(".pokemon-height");
    pokemonHeight.innerText = "Height: " + pokemon.height / 10 + " m";

    let pokemonWeight = document.querySelector(".pokemon-weight");
    pokemonWeight.innerText = "Weight: " + pokemon.weight / 10 + "kgs";

    let itemTypes = "";
    pokemon.types.forEach(function (types) {
      itemTypes += ["<li class='types-list-item' id='types-list-item'>" + types.type.name.charAt(0).toUpperCase() + types.type.name.slice(1) + "</li>"];
    });

    let pokemonTypes = document.querySelector(".pokemon-types");
    pokemonTypes.innerHTML = itemTypes;

    let itemAbilities = "";
    pokemon.abilities.forEach(function (abilities) {
      itemAbilities += ["<li>" + abilities.ability.name.charAt(0).toUpperCase() + abilities.ability.name.slice(1) + "</li>"];
    });
    let pokemonAbilities = document.querySelector(".pokemon-abilities");
    pokemonAbilities.innerHTML = itemAbilities;

    let itemMoves = "";
    pokemon.moves.forEach(function (moves) {
      itemMoves += ["<li>" + moves.move.name.charAt(0).toUpperCase() + moves.move.name.slice(1) + "</li>"];
    });
    let pokemonMoves = document.querySelector(".pokemon-moves");
    pokemonMoves.innerHTML = itemMoves;

    let itemStatsName = "";
    pokemon.stats.forEach(function (stats) {
      itemStatsName += ["<li>" + stats.stat.name.charAt(0).toUpperCase() + stats.stat.name.slice(1) + "</li>"];
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


// let backgroundColor = pokemon.types.type;
//     if (pokemon.types.type === "bug") {
//         pokemonListElement.setAttribute("style", "background-color: rgb(209, 224, 77)")
//       } else if (pokemon.types.type === "dark") {
//         pokemonListElement.setAttribute("style", "background-color: rgb(112, 88, 72)")
//       } else if (pokemon.types.type === "dragon") {
//         pokemonListElement.setAttribute("style", "background-color: rgb(112, 56, 248)")
//       } else if (pokemon.types.type === "electric") {
//         pokemonListElement.setAttribute("style", "background-color: rgb(248, 208, 48)")
//       } else if (pokemon.types.type === "fairy") {
//         pokemonListElement.setAttribute("style", "background-color: rgb(238, 153, 172)")
//       } else if (pokemon.types.type === "fighting") {
//         pokemonListElement.setAttribute("style", "background-color: rgb(209, 224, 77)")
//       } else if (pokemon.types.type === "fire") {
//         pokemonListElement.setAttribute("style", "background-color: rgb(209, 224, 77)")
//       } else if (pokemon.types.type === "flying") {
//         pokemonListElement.setAttribute("style", "background-color: rgb(209, 224, 77)")
//       } else if (pokemon.types.type === "ghost") {
//         pokemonListElement.setAttribute("style", "background-color: rgb(209, 224, 77)")
//       } else if (pokemon.types.type === "grass") {
//         pokemonListElement.setAttribute("style", "background-color: rgb(209, 224, 77)")
//       } else if (pokemon.types.type === "ground") {
//         pokemonListElement.setAttribute("style", "background-color: rgb(209, 224, 77)")
//       } else if (pokemon.types.type === "ice") {
//         pokemonListElement.setAttribute("style", "background-color: rgb(209, 224, 77)")
//       } else if (pokemon.types.type === "normal") {
//         pokemonListElement.setAttribute("style", "background-color: rgb(209, 224, 77)")
//       } else if (pokemon.types.type === "poison") {
//         pokemonListElement.setAttribute("style", "background-color: rgb(209, 224, 77)")
//       } else if (pokemon.types.type === "psychic") {
//         pokemonListElement.setAttribute("style", "background-color: rgb(209, 224, 77)")
//       } else if (pokemon.types.type === "rock") {
//         pokemonListElement.setAttribute("style", "background-color: rgb(209, 224, 77)")
//       } else if (pokemon.types.type = "steel") {
//         pokemonListElement.setAttribute("style", "background-color: rgb(209, 224, 77)")
//       } else if (pokemon.types.type = "water") {
//         pokemonListElement.setAttribute("style", "background-color: rgb(209, 224, 77)")
//       } else {
//         button.setAttribute("style", "background-color: white; color: black;")
//       }