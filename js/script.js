const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const pokemonTypeElement = document.getElementById('pokemon_type');

const typeMappings = {
    bug: 'Bug',
    dark: 'Dark',
    dragon: 'Dragon',
    electric: 'Electric',
    fairy: 'Fairy',
    fighting: 'Fighting',
    fire: 'Fire',
    flying: 'Flying',
    ghost: 'Ghost',
    grass: 'Grass',
    ground: 'Ground',
    ice: 'Ice',
    normal: 'Normal',
    poison: 'Poison',
    psychic: 'Psychic',
    rock: 'Rock',
    steel: 'Steel',
    water: 'Water'
};

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'loading...💾';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
        input.value = '';
        searchPokemon = data.id;
        const type = data.types[0].type.name;
        
        pokemonTypeElement.className = `Type ${typeMappings[type]}`;

        console.log(`O tipo do Pokémon é: ${type}`);
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found 😵';
        pokemonNumber.innerHTML = '';
        input.value = '';
        pokemonTypeElement.className = `Type Empty`;
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {   
    if(searchPokemon > 1){ 
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {    
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
