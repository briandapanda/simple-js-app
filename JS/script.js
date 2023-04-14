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
    const $button = $('<button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" id="showDetailsButton"></button>');

    //Check if button for pokemon already exists
    const existingButton = $pokemonList.find('button:contains(${pokemon.name})');
    if (existingButton.length) {
      return;
    }
  
    $button.text(pokemon.name);
    $button.click(function () {
      showDetails(pokemon);
    });
  
    $listItem.append($button);
    $pokemonList.append($listItem);
  }
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      const modalTitle = document.querySelector('.modal-title');
      const modalBody = document.querySelector('.modal-body');
  
      modalTitle.innerHTML = '<h1>' + pokemon.name + '</h1>';
      modalBody.innerHTML = '<img class="modal-img" src="' + pokemon.imageUrl + '">' +
        '<p>Height: ' + (pokemon.height / 10) + ' m</p>' +
        '<p>Types: ' + (pokemon.types ? pokemon.types.join(', ') : '') + '</p>' +
        '<p>Weight: ' + (pokemon.weight / 10) + ' kg</p>';
  
      $('#pokemonDetailModal').modal('toggle');
    });
  }
  
  //gets list from API and adds pokemon as objects
  function loadList() {
    return fetch(apiUrl, {
      mode: 'cors'
    })
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
        return pokemonList; 
      })
      .catch(function(e){
        throw new Error('Failed to load pokemon list: ' + e.message);
      });
  }
  


function loadDetails(pokemon) {
  let url = pokemon.detailsUrl;
  return fetch(url, {
    mode: 'cors'
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      pokemon.imageUrl = json.sprites.front_default;
      pokemon.height = json.height;
      pokemon.weight = json.weight;
      pokemon.types = json.types.map(function (type) {
        return type.type.name;
      });
    })
    .catch(function (e) {
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




  