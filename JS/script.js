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
  
    $button.text(pokemon.name);
    $button.click(function () {
      pokemonRepository.showDetails(pokemon);
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
        '<p>Height: ' + pokemon.height + '</p>' +
        '<p>Type: ' + (pokemon.types ? pokemon.types.join(', ') : '') + '</p>';
  
      $('#pokemonDetailModal').modal('toggle');
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
        return pokemonList; 
      })
      .catch(function(e){
        throw new Error('Failed to load pokemon list: ' + e.message);
      });
  }
  


function loadDetails(pokemon) {
  let url = pokemon.detailsUrl;
  return fetch(url)
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

  
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();
  // creating element for name in modal content
    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    //creating img
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr('src', pokemon.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr('src', pokemon.imageUrlBack);
    let heightElement = $('<p>' + 'height : ' + pokemon.height + '</p>');
    let weightElement = $('<p>' + 'weight : ' + pokemon.weight + '</p>');
    let typesElement = $('<p>' + 'types : ' + pokemon.types +'</p>');
    let abilitiesElement = $('<p>' + 'abilities : ' + pokemon.abilities + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);

    // Find the close button element
    const $closeButton = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>');
    const $span = $('<span aria-hidden="true">&times;</span>');
    $closeButton.append($span);

    // Add a click event listener to the close button
    $closeButton.on('click', function () {
      $('#exampleModal').modal('hide');
    });

    // Append the close button to the modal
    $('.modal-content').append($closeButton);

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




  