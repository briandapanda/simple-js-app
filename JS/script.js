// IIFE begins here
let pokemonRepository = (function(){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//function to add new pokemon to the list
  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
        pokemonList.push(pokemon);
    } else {
        console.log ('Invalid Pokemon');
    }
  }
  function getAll() {
    return new Promise(function(resolve,reject){
      setTimeout(function(){
        resolve(pokemonList);
      }, 2000);
    });
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
    loadDetails(pokemon).then(function(){
      console.log(pokemon);
    });
  }
//gets list from API and adds pokemon as objects
  function loadList() {
    return fetch(apiUrl)
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        json.results.forEach(function(item){
          let pokemon = {
            name: item.name,
            detailsUrl: item.url 
          };
           add(pokemon);
        });
        // returns list of pokemon after data is loaded
        return pokemonList; 
      })
      .catch(function(e){
        console.error(e);
      });
  }

function loadDetails(pokemon){
  let url = pokemon.detailsUrl;
  return fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(details){
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
    })
    .catch(function(e){
      console.error(e);
    });
}

function addAllPokemon() {
  pokemonRepository.getAll().then(function(pokemonList){
    pokemonList.forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });
}

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    addAllPokemon: addAllPokemon
  };
})();

pokemonRepository.loadList().then(function(){
  // calls all Pokemon after data is loaded
  pokemonRepository.addAllPokemon();
});

pokemonRepository.getAll().then(function(pokemonList){
  pokemonList.forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});