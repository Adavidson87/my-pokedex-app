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
]
//Prints list of pokemon
for (let i=0; i < pokemonList.length; i++) {
  document.write("Name: " + pokemonList[i].name + ", " + "Height: " + pokemonList[i].height + "m");
}
