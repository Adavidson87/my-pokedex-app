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
  let modalContainer = document.querySelector('#modal-container');

  function showModal(item) {
    pokemonRepository.loadDetails(item).then(function() {

      let modalHeader = document.querySelector('modal-header');
      let modalTitle = $('modal-title');
      let modalBody = $('modal-body');


    modalContainer.innerHTML = '';

    // let modal = document.createElement('div');
    // modal.classList.add('modal');

    // adds close button to modal
    // let closeButtonElement = document.createElement('buttton');
    // closeButtonElement.classList.add('modal-close');
    // closeButtonElement.innerText = 'Close';
    // closeButtonElement.addEventListener('click', hideModal);

    // sets pokemon name
    let nameElement = $('<h1>' + item.name + '</h1>');
    // nameElement.innerText = item.name;

    // sets pokemon height
    let heightElement = $('<p>' + 'Height: ' + insertDecimal(item.height) + 'm' + '</p>');
    // heightElement.innerText = ("Height: " + insertDecimal(item.height) + "m");

    let imgElement = $('<img>' + item.imageUrl + '</img>');
    // imgElement.src = item.imageUrl;

    let weightElement = $('<p>' + 'Weight: ' + insertDecimal(item.weight) + 'kg' + '</p>');
    // weightElement.innerText = ("Weight: " + insertDecimal(item.weight) + "kg");

    let abilitiesElement = $('<p>' + 'Abilities: ' + '</p>');
    // abilitiesElement.innerText = item.abilities;

    let typeElement = $('<p>' + 'Types: ' + '</p>');
    // typeElement.innerText = item.types;

    // modal.appendChild(closeButtonElement);
    modalTitle.append(nameElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);
    modalBody.append(abilitiesElement);
    modalBody.append(imgElement);

    // modalContainer.appendChild(modal);

    // modalContainer.addClass('is-visible')
  });
  }

  // hides modal
  // function hideModal() {
  //   let modalContainer = document.querySelector('#modal-container');
  //   modalContainer.classList.remove('is-visible');
  // }

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
    // showModal: showModal,
    // hideModal: hideModal,
    insertDecimal: insertDecimal
  };

})();

pokemonRepository.loadList().then(function() {
  //Now the data is loaded
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
