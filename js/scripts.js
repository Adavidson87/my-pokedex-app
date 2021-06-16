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
      showModal(pokemon.name, pokemon.height, pokemon.imgUrl);
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

  //adds modal
  let modalContainer = document.querySelector('#modal-container');

  function showModal(item) {

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // adds close button to modal
    let closeButtonElement = document.createElement('buttton');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    // sets pokemon name
    let nameElement = document.createElement('h1');
    nameElement.innerText = item.name;

    // sets pokemon height
    let heightElement = document.createElement('p');
    heightElement.innerText = item.height;

    let imgElement = document.createElement('img');
    imgElement.src = item.imgUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(heightElement);
    modal.appendChild(imgElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  // hides modal
  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  // window.addEventListener('keydown', (e) => {
  //   let modalContainer = document.querySelector('#modal-container');
  //   if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
  //     hideModal();
  //   }
  // });

  // modalContainer.addEventListener('click', (e) => {
  //   let target = e.target;
  //   if (target === modalContainer) {
  //     hideModal();
  //   }
  // });

  //list of usuable functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };

})();

pokemonRepository.loadList().then(function() {
  //Now the data is loaded
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
