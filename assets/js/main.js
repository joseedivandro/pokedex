const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {

    return `
        <li  class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            
        </li>
    `
}



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToLi).join("");
      pokemonList.innerHTML += newHtml;
  
      const pokemonElements = document.querySelectorAll(".pokemon");
  
      pokemonElements.forEach((pokemonElement) => {
        pokemonElement.addEventListener("click", () => {
          // toggle a classe .selected no elemento do pokemon clicado
          const detailsElement = pokemonElement.querySelector(".details");
          pokemonElement.classList.toggle("selected");
          
        });
      });
    });
  }

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', (evt) => {

    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
       

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
        
    }
})