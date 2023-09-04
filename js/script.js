const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokeAbilities1 = document.querySelector('.abilities1');
const pokeAbilities2 = document.querySelector('.abilities2');
const pokemonHealth = document.querySelector('.hp');
const pokemonAttack = document.querySelector('.attack');
const pokemonDefese = document.querySelector('.defese');
const pokemonWeight = document.querySelector('.weight');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const pokemonTypeElement = document.getElementById('pokemon_type');
const pokemonTypeElement2 = document.getElementById('pokemon_type2');
const combatPoint = document.getElementById('.cp');


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
        let pokemon=data;
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = formatName(pokemon.name);
        pokemonNumber.innerHTML = pokemon.id;
        pokeAbilities1.innerHTML = pokemon.abilities[0].ability.name;
        pokeAbilities2.innerHTML = pokemon.abilities[1].ability.name;
        pokemonDefese.innerHTML = pokemon.stats[2].base_stat;
        pokemonAttack.innerHTML = pokemon.stats[1].base_stat;
        pokemonHealth.innerHTML = pokemon.stats[0].base_stat;
        pokemonWeight.innerHTML = pokemon.weight;
        pokemonImage.src = pokemon.sprites.versions['generation-v']['black-white'].animated.front_default;
        input.value = '';
        searchPokemon = pokemon.id;
        const type = pokemon.types[0].type.name;
        const type2 = pokemon.types.length > 1 ? pokemon.types[1].type.name : '';// Verifique se existe um segundo tipo
        const cp = calcularCP(pokemon);
        const cpElement = document.querySelector('.cp'); // Seleciona o elemento com a classe "cp"
        cpElement.innerHTML = `CP: ${cp}`; // Exibe o CP do Pokémon dentro do elemento selecionado
        
        pokemonTypeElement.className = `Type ${typeMappings[type]}`;
        
        // Verifique se existe um segundo tipo e defina a classe de acordo
        if (type2) {
            pokemonTypeElement2.className = `Type2 ${typeMappings[type2]}`;
        } else {
            pokemonTypeElement2.className = 'Type2 Empty';
        }

        console.log(pokemon);
       
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found 😵';
        pokemonNumber.innerHTML = '';
        input.value = '';
        pokemonTypeElement.className = `Type Empty`;
        pokemonTypeElement2.className = `Type2 Empty`;
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

function formatName(pokemon_name){
    if(pokemon_name.length > 10){
        return pokemon_name.substring(0,10);
    }
    return pokemon_name
}


function calcularCP(pokemon) {
    const ataque = pokemon.stats[1].base_stat;
    const defesa = pokemon.stats[2].base_stat;
    const stamina = pokemon.stats[0].base_stat;
    const cpMultiplicador = 0.5; // Valor do multiplicador de CP
    
    const cp = (ataque / 10) * (Math.pow(defesa,1) / 10) * (Math.pow(stamina,1) / 10.0) * (cpMultiplicador, 2);
    
    return Math.floor(cp);
}

// Selecione as divs que precisam ter classes adicionadas/removidas
const container1 = document.querySelector('.container_1');
const container2 = document.querySelector('.container_2');
const pokemonData = document.querySelector('.pokemon_data');
const penSing = document.querySelector('.penSing');
const buttons = document.querySelector('.buttons');
const lamp1 = document.querySelector('.lamp1');
const info = document.querySelector('.info');


// Variável para rastrear o estado atual
let isToggled = false;

// Adicione um evento de clique à div com a classe 'info'
info.addEventListener('click', () => {
  if (isToggled) {
    // Se o estado estiver ativado, reverter as mudanças
    container2.style.display = 'none';
    container1.classList.remove('w50', 'left');
    pokemonData.classList.remove('backActive');
    form.classList.remove('backActive');
    buttons.classList.remove('backActive');
    lamp1.classList.remove('backActive');
    info.classList.remove('backActive');
    penSing.classList.remove('backActive');
    pokemonImage.classList.remove('backActive');
} else {
    container2.style.display = 'block';
    container1.classList.add('w50', 'left');
    pokemonData.classList.add('backActive');
    form.classList.add('backActive');
    lamp1.classList.add('backActive');
    buttons.classList.add('backActive');
    penSing.classList.add('backActive');
    info.classList.add('backActive');
    pokemonImage.classList.add('backActive');
    // Se o estado não estiver ativado, aplicar as mudanças
    
  }

  // Alternar o estado
  isToggled = !isToggled;
});

