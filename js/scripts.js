//Wrapping pokemonList in IIFE
let pokemonRepository = (function () {
  //Array of pokemon
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Adds pokemon to the list
  function add(pokemon) {

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
  function addListItem(pokemon) {

    let pokemonList = document.querySelector(".list-group");
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');

    button.innerText = pokemon.name;
    button.classList.add("btn-info");
    button.setAttribute('data-target', '#pokemon-name', 'data-toggle', 'modal');
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });

    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    listpokemon.classList.add('list-group-item');

  }

  //shows details when button is pushed
  function showDetails(pokemon){

    loadDetails(pokemon).then(function () {
      showModal(pokemon);
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
      item.name = details.name
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
      item.abilites = details.abilities;
    }).catch(function(e) {
      console.error(e);
    });
  }

  // adds modal
  let modalContainer = $('#modal-container');

  function showModal(item) {

    let modalHeader = $('modal-header');
    let modalTitle = $('modal-title');
    let modalBody = $('modal-body');


    modalContainer.innerHTML = '';

    // sets pokemon name
    let nameElement = $('<h1>' + item.name + '</h1>');

    // sets pokemon height
    let heightElement = $('<p>' + 'Height: ' + insertDecimal(item.height) + 'm' + '</p>');

    let imgElement = $('<img>' + item.imageUrl + '</img>');

    let weightElement = $('<p>' + 'Weight: ' + insertDecimal(item.weight) + 'kg' + '</p>');

    let abilitiesElement = $('<p>' + 'Abilities: ' + '</p>');

    let typeElement = $('<p>' + 'Types: ' + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);
    modalBody.append(abilitiesElement);
    modalBody.append(imgElement);

  }

  //adds decimal to height to render it correctly
  function insertDecimal(num){
    return Number((num / 10).toFixed(2));
  };

  //list of usuable functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    insertDecimal: insertDecimal
  };

})();

pokemonRepository.loadList().then(function() {
  //Now the data is loaded
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
