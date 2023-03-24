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
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      //adding event listener to close modal when button is clicked//
      closeButtonElement.addEventListener('click', function(){
        modalContainer.removeChild(modal);
        modalContainer.classList.remove('is-visible');
      });
      //adding modal information//
      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;

      let heightElement = document.createElement('p');
      heightElement.innerText = 'Height: ' + pokemon.height;

      let imageElement = document.createElement('img');
      imageElement.classList.add('modal-image');
      imageElement.setAttribute('src', pokemon.imageUrl);

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(heightElement);
      modal.appendChild(imageElement);
      modalContainer.appendChild(modal);
     

      //add to close modal when clicking outside of modal//
      window.addEventListener('click', function(event){
        if (event.target === modal) {
          modalContainer.removeChild(modal);
        }
      });

      //shows modal
      modalContainer.classList.add('is-visible');
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
    pokemonList.forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });
});