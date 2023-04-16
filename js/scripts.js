let pokemonRepository = (function () {
  let pokemonList = [
    {
      pokemonNumber: 1,
      name: "bulbasaur",
      type: [" grass", " poison"],
      height: 0.7,
      weight: 6.9,
      evolvesFrom: "N/A",
      evlovlesFromLvl: "N/A",
      evlovesInto: "ivysaur",
      evolvesIntoLvl: 16,
      hp: 25,
      attack: 49,
      defense: 49,
      speed: 45,
      spAtk: 65,
      spDef: 65,
    },
    {
      pokemonNumber: 2,
      name: "ivysaur",
      type: ["grass", "poison"],
      height: 1,
      weight: 13,
      evolvesFrom: "bulbasaur",
      evlovlesFromLvl: 16,
      evlovesInto: "venusaur",
      evolvesIntoLvl: 32,
      hp: 60,
      attack: 62,
      defense: 63,
      speed: 60,
      spAtk: 80,
      spDef: 80,
    },
    {
      pokemonNumber: 3,
      name: "venusaur",
      type: ["grass", "poison"],
      height: 2,
      weight: 100,
      evolvesFrom: "ivysaur",
      evlovlesFromLvl: "32",
      evlovesInto: "N/A",
      evolvesIntoLvl: "N/A",
      hp: 80,
      attack: 82,
      defense: 83,
      speed: 80,
      spAtk: 100,
      spDef: 100,
    },
  ];

  return {
    add: function (pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function () {
      return pokemonList;
    },
  };
})();

console.log(pokemonRepository.getAll());
// pokemonRepository.add({ name: 'Pikachu' });
// console.log(pokemonRepository.getAll());

function printArrayDetails() {
  let listOfPokemon = pokemonRepository.getAll();
  listOfPokemon.forEach(function (pokemon) {
    // document.write(
    //   "#" + pokemon.pokemonNumber + "." + " " + pokemon.name + "," + " "
    // );
    Object.keys(pokemon).forEach(function (property) {
      document.write(pokemon[property]);
    });
  });
}

printArrayDetails();
