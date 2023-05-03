/** @format */

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=1000";

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
        item.frontDefaultSprite = details.sprites.front_default;
        item.backDefaultSprite = details.sprites.back_default;
        item.imageUrl =
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
          details.id +
          ".png";
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
      pokemonListElement.setAttribute("id", "li");

      let buttonImage = document.createElement("img");
      buttonImage.classList.add("button-image");
      buttonImage.setAttribute(
        "src",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
          pokemon.id +
          ".png"
      );

      let buttonName = document.createElement("h5");
      buttonName.classList.add("button-name");
      buttonName.innerText =
        "#" + pokemon.id + " " + pokemon.name.toUpperCase();

      let button = document.createElement("btn");
      button.classList.add("button-class");
      button.setAttribute("id", "show-modal");
      button.setAttribute("type", "button");
      button.setAttribute("data-toggle", "modal");
      button.setAttribute("data-target", "#modal-container");
      button.addEventListener("click", function (event) {
        showDetails(pokemon);
      });

      pokemonList.sort();

      pokemonListElement.appendChild(button);
      pokemonListGroup.appendChild(pokemonListElement);
      button.appendChild(buttonImage);
      button.appendChild(buttonName);
    });
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

    let pokemonImageFront = document.querySelector(".pokemon-image-front");
    pokemonImageFront.src = pokemon.frontDefaultSprite;

    let pokemonImageBack = document.querySelector(".pokemon-image-back");
    pokemonImageBack.src = pokemon.backDefaultSprite;

    let pokemonHeight = document.querySelector(".pokemon-height");
    pokemonHeight.innerText = pokemon.height / 10 + " m";

    let pokemonWeight = document.querySelector(".pokemon-weight");
    pokemonWeight.innerText = pokemon.weight / 10 + "kgs";

    let itemTypes = "";
    pokemon.types.forEach(function (types) {
      itemTypes += [
        "<li class='types-list-item' id='types-list-item'>" +
          types.type.name.charAt(0).toUpperCase() +
          types.type.name.slice(1) +
          "</li>",
      ];
    });

    

    let pokemonTypes = document.querySelector(".pokemon-types");
    pokemonTypes.innerHTML = itemTypes;

    let typesBackground = document.getElementById("types-list-item");
    if (typesBackground.innerHTML == "grass") {
      typesBackground.setAttribute("style:", "background-color: rgb(120, 200, 80)")
    }

    let itemAbilities = "";
    pokemon.abilities.forEach(function (abilities) {
      itemAbilities += [
        "<li>" +
          abilities.ability.name.charAt(0).toUpperCase() +
          abilities.ability.name.slice(1) +
          "</li>",
      ];
    });
    let pokemonAbilities = document.querySelector(".pokemon-abilities");
    pokemonAbilities.innerHTML = itemAbilities;

    let itemMoves = "";
    pokemon.moves.forEach(function (moves) {
      itemMoves += [
        "<li>" +
          moves.move.name.charAt(0).toUpperCase() +
          moves.move.name.slice(1) +
          "</li>",
      ];
    });
    let pokemonMoves = document.querySelector(".pokemon-moves");
    pokemonMoves.innerHTML = itemMoves;

    let itemStats = "";
    pokemon.stats.forEach(function (stats) {
      itemStats += ["<li class='meter'>" + "<span class='stats-progress-bar' style='width: " + stats.base_stat  + "%'>" + stats.base_stat + "</span>" + "</li>"];
    });
    let pokemonStats = document.querySelector(".pokemon-stats");
    pokemonStats.innerHTML = itemStats;

    let progressBarMeter = document.createElement("div");
    progressBarMeter.classList.add("meter");

    let progressBarSpan = document.createElement("span");
    progressBarSpan.classList.add("stats-progress-bar");
    progressBarSpan.setAttribute("style", "width: " + pokemon.stats);

    
    pokemonStats.appendChild(progressBarMeter);
    itemStats.appendChild(progressBarSpan)
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

// let createPage = function () {
//   let numberOfPokemonDisplayed = pokemonRepository.loadList();
//   let numberOfPages = numberOfPokemonDisplayed / 25;
//   console.log(numberOfPages);
// };

// createPage();

// let listPagination = function () {
//   const paginationNumbers = document.getElementById("pagination-number");
//   const paginatedList = document.getElementById("paginated-list");
//   const listItems = paginatedList.querySelectorAll("li");
//   const nextButton = document.getElementById("next-button");
//   const prevButton = document.getElementById("previous-button");

//   const paginationLimit = 20;
//   const pageCount = Math.ceil(listItems.length / paginationLimit);
//   let currentPage = 1;

//   const appendPageNumber = (index) => {
//     const pageNumber = document.createElement("button");
//     pageNumber.className = "pagination-number";
//     pageNumber.innerHTML = index;
//     pageNumber.setAttribute("page-index", index);
//     pageNumber.setAttribute("aria-label", "Page" + index);
//     paginationNumbers.appendChild(pageNumber);
//   };

//   const getPaginationNumbers = () => {
//     for (let i = 1; 1 <= pageCount; i++) {
//       appendPageNumber(i);
//     }
//   };

//   const setCurrentPage = (pageNum) => {
//     currentPage = pageNum;
//     const prevRange = (pageNum - 1) * paginationLimit;
//     const currRange = pageNum * paginationLimit;
//     handleActivePageNumber();
//     listItems.forEach((item, index) => {
//       item.classList.add("hidden");
//       if (index >= prevRange && index < currRange) {
//         item.classList.remove("hidden");
//       }
//     });
//   };

//   const handleActivePageNumber = () => {
//     document.querySelectorAll(".pagination-number").forEach((button) => {
//       button.classList.remove("active");
//       const pageIndex = Number(button.getAttribute("page-index"));
//       if (pageIndex == currentPage) {
//         button.classList.add("active");
//       }
//     });
//   };

//   window.addEventListener("load", () => {
//     getPaginationNumbers();
//     setCurrentPage(1);

//     document.querySelectorAll(".pagination-number").forEach((button) => {
//       const pageIndex = Number(button.getAttribute("page-index"));
//       if (pageIndex) {
//         button.addEventListener("click", () => {
//           setCurrentPage(pageIndex);
//         });
//       }
//     });
//   });
// };

// function pageLoadTime() {
//   let occuredTime = 100000;
//   for (let i = 1; i <= 100000; i++) {
//   if (i !== occuredTime) {
//     document.querySelector("body").style.visibility = "visible";
//       document.querySelector("#loader").style.visibility = "none";
//   } else {
//     document.querySelector("#loader").style.display = "visible";
//     document.querySelector("body").style.visibility = "none";
//   }
// }}
// pageLoadTime();

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
