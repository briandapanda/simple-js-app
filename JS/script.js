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

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    })
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

let pokemonList = document.querySelector('.pokemon-list');

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
