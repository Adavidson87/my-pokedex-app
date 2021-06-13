//Wrapping pokemonList in IIFE
let pokemonRepository = (function () {
  //Array of pokemon
  let pokemonList = [
    {name: 'Bulbuasaur',height: .7,type: ['grass', 'poison']},
    {name: 'Ivysaur',height: 1,type: ['grass', 'poison']},
    {name: 'Veusaur', height: 2, type: ['grass', 'poison']},
    {name: 'Charmander', height: .6, type: 'fire'},
    {name: 'Charmeleon', height: 1.1, type: 'fire'},
    {name: 'Charizard', height: 1.7, type: ['fire', 'flying']},
    {name: 'Squirtle', height: .5, type: 'water'},
    {name: 'Wrtortle', height: 1, type: 'water'},
    {name: 'Blastoise', height: 1.6, type: 'water'},
    {name: 'Caterpie', height: .3, type: 'bug'},
    {name: 'Metapod', height: .7, type: 'bug'},
    {name: 'Butterfree', height: 1.1, type: ['bug', 'flying']},
    {name: 'Weedle', height: .3, type: ['bug', 'poison']},
    {name: 'Kakuna', height: .6, type: ['bug', 'poison']},
    {name: 'Beedrill', height: 1, type: ['bug', 'poison']},
    {name: 'Pidgey', height: .3, type: ['flying', 'normal']},
    {name: 'Pidgeotto', height: 1.1, type: ['flying', 'normal']},
    {name: 'Pidgeot', height: 1.5, type: ['flying', 'normal']},
    {name: 'Rattata', height: .3, type: 'normal'},
    {name: 'Raticate', height: .7, type: 'normal'},
    {name: 'Spearow', height: .3, type: ['flying', 'normal']},
    {name: 'Fearow', height: 1.2, type: ['flying', 'normal']},
    {name: 'Ekans', height: 2, type: 'poison'},
    {name: 'Arbok', height: 3.5, type: 'poison'},
    {name: 'Pikachu', height: .4, type: 'electric'},
    {name: 'Raichu', height: .8, type: 'electric'}
  ];

  //Adds pokemon to the list
  function add(pokemon){
    if (typeof(pokemon) === 'object'){
      pokemonList.push(pokemon);
    }
    else
    return document.write("Not correct information");
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

  function showDetails(pokemon){
    console.log(pokemon);
  }

  //list of usuable functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
