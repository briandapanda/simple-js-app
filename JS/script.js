// array of pokemon 
let pokemonRepository = (function(){
  let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
    { name: 'Eevee', height: 0.3, types: ['normal'] }, 
    { name: 'Vulpix', height: 0.6, types: ['fire'] }, 
    { name: 'Weedle', height: 0.3, types: ['bug', 'poison']}, 
    { name: 'Nidoqueen', height: 1.3, types: ['ground', 'poison']},
];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon && 'height' in pokemon && 'types'in pokemon) {
        pokemonList.push(pokemon);
    } else {
        console.error('Invalid Pokemon Object')
    }
  }

  return {
    getAll: getAll,
    add: add
  };
})();

// loop practice 
pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height > 1) {
        document.write(pokemon.name + " - (Height: " + pokemon.height + ") - Yowza, that's big! <br>" ); 
    } else {
        document.write(pokemon.name + " - (Height: " + pokemon.height + ")<br>");
    }
});
