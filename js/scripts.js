//Wrapping pokemonList in IIFE
let pokemonRepository = (function () {
  //Array of pokemon
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Adds pokemon to the list
  function add(pokemon){
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    )
    pokemonList.push(pokemon);
    else {
      return document.write("Not correct information");
    }
  }

  //prints pokemon list
  function getAll() {
    return pokemonList;
  }

  //applies button to each pokemon name
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }

  //shows details when button is pushed
  function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  //gets pokemon details from api
  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
      return fetch(url).then(function(response) {
        return response.json();
      }).then(function(details) {
        //adds details to the add addListItem
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function(e) {
        console.error(e);
      });
  }


  //list of usuable functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
  //Now the data is loaded
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
