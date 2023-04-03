let pokemonRepository = (function(){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//function to add new pokemon to the list
  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
        pokemonList.push({
          name: pokemon.name,
          detailsUrl: pokemon.url
        });
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
  //creates button for each pokemon 
  function addListItem(pokemon) {
    const $pokemonList = $('.pokemon-list');
    const $listItem = $('<li class="list-group-item"></li>');
    const $button = $('<button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"></button>');
  
    $button.text(pokemon.name);
    $button.click(function () {
      pokemonRepository.showDetails(pokemon);
    });
  
    $listItem.append($button);
    $pokemonList.append($listItem);
  }
  
  function showDetails(pokemon) {
    console.log('showDetails function is being called!');
    loadDetails(pokemon).then(function () {
      const modalTitle = $('.modal-title');
      const modalBody = $('.modal-body');
  
      modalTitle.empty();
      modalBody.empty();
  
      const nameElement = $('<h1>' + pokemon.name + '</h1>');
      const imageElement = $('<img class="modal-img">');
      imageElement.attr('src', pokemon.imageUrl);
      const heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
      const typesElement = $('<p>' + 'Types: ' + (pokemon.types ? pokemon.types.join(', ') : '') + '</p>');
  
      modalTitle.append(nameElement);
      modalBody.append(imageElement);
      modalBody.append(heightElement);
      modalBody.append(typesElement);
  
      console.log('Before toggling modal:');
      console.log($('#pokemonDetailModal'));
  
      $('pokemonDetailModal').modal('toggle');
  
      console.log('After toggling modal:');
      console.log($('#pokemonDetailModal'));
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
        addListItem(pokemon);
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
    .then(function(json){
      pokemon.imageUrl = json.sprites.front_default;
      pokemon.height = json.height;
      pokemon.weight = json.weight;
      pokemon.type = json.types[0].type.name;
    })
    .catch(function(e){
      console.error(e);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function(){
  // calls all Pokemon after data is loaded
  pokemonRepository.getAll().then(function(pokemonList) {
    pokemonList.forEach(function(pokemon, index){
      pokemonRepository.addListItem(pokemon);
      $('#' + index).attr('id', pokemon.name);
    });
  });
})