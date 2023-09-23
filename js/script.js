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

const dadosPessoais = {
    nome: "Wellington",
    number: '0',
    abilities1: "Web Development",
    abilities2: "Graphic Designer",
    health: '2',
    attack: '55',
    defese: '10',
    weight: '62',
    
    cp: `Who's that Pokemon?`,
    // Adicione mais informações pessoais conforme necessário
  };
  

let searchPokemon = '1';

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
};



async function renderPokemon(inputValue) {
    if (inputValue === "wellington") {

    const linkedin = document.querySelector('.linkedin');
    const github = document.querySelector('.github');
    // Se o nome for "Wellington", renderize as informações pessoais
    pokemonName.innerHTML = dadosPessoais.nome;
    pokemonNumber.innerHTML = dadosPessoais.number;
    pokemonDefese.innerHTML = dadosPessoais.defese;
    pokemonAttack.innerHTML = dadosPessoais.attack;
    pokemonHealth.innerHTML = dadosPessoais.health;
    pokemonWeight.innerHTML = dadosPessoais.weight;
    pokeAbilities1.innerHTML = dadosPessoais.abilities1;
    pokeAbilities2.innerHTML = dadosPessoais.abilities2;
    pokemonTypeElement.className = 'Type Linkedin';
    pokemonTypeElement2.className = 'Type2 Github';
    linkedin.style.display = 'block';
    github.style.display = 'block';
    wellImage.style.display = 'block';
    pokemonImage.style.display = 'none';

    const cpElement = document.querySelector('.cp');
    cpElement.innerHTML = dadosPessoais.cp;
    // Renderize outras informações pessoais aqui
  } else {
    // Caso contrário, renderize informações de Pokémon
    pokemonName.innerHTML = "loading...💾";
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(inputValue);

    if (data) {
        let pokemon = data;
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = formatName(pokemon.name);
        pokemonNumber.innerHTML = pokemon.id;


        pokemonDefese.innerHTML = pokemon.stats[2].base_stat;
        pokemonAttack.innerHTML = pokemon.stats[1].base_stat;
        pokemonHealth.innerHTML = pokemon.stats[0].base_stat;
        pokemonWeight.innerHTML = pokemon.weight;
        pokemonImage.src = pokemon.sprites.versions['generation-v']['black-white'].animated.front_default;
        input.value = '';
        searchPokemon = pokemon.id;
        const type = pokemon.types[0].type.name;
        const type2 = pokemon.types.length > 1 ? pokemon.types[1].type.name : ''; // Verifique se existe um segundo tipo
        const poke2Abilities = pokemon.abilities.length > 1 ? pokemon.abilities[1].ability.name : '';
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

        if (poke2Abilities) {
            pokeAbilities1.innerHTML = pokemon.abilities[0].ability.name;
            pokeAbilities2.innerHTML = pokemon.abilities[1].ability.name;
        } else {
            pokeAbilities2.innerHTML = 'undefined';
        }

        const linkedin = document.querySelector('.linkedin');
        const github = document.querySelector('.github');
        linkedin.style.display = 'none';
        github.style.display = 'none';
        wellImage.style.display = 'none';
        pokemonImage.style.display = 'block';


        console.log(pokemon);

    }

    else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found 😵';
        pokemonNumber.innerHTML = '';
        input.value = '';
        pokemonTypeElement.className = `Type Empty`;
        pokemonTypeElement2.className = `Type2 Empty`;
        pokeAbilities2.innerHTML = 'Empty';
    }

    }
}




form.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue = input.value.toLowerCase();
    renderPokemon(inputValue);
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

//funcao para calcular o CP do pokemon
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
const wellImage = document.querySelector('.wellImage');


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
    wellImage.classList.remove('backActive');
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
    wellImage.classList.add('backActive');
    // Se o estado não estiver ativado, aplicar as mudanças
    
  }

  // Alternar o estado
  isToggled = !isToggled;
});


// Função para criar a animação de shake-horizontal
function shakeHorizontal(element) {
    let interval;
  
    function startAnimation() {
      element.style.transition = 'transform 0.3s ease-in-out';
      element.style.transform = 'translateX(-10px)';
    }
  
    function midAnimation() {
      element.style.transition = 'transform 0.3s ease-in-out';
      element.style.transform = 'translateX(8px)';
    }
  
    function mid2Animation() {
      element.style.transition = 'transform 0.3s ease-in-out';
      element.style.transform = 'translateX(-6px)';
    }
  
    function endAnimation() {
      element.style.transition = 'transform 0.3s ease-in-out';
      element.style.transform = 'translateX(0px)';
    }
  
    function animate() {

      setTimeout(() => {
        startAnimation();
      }, 400);
  
      setTimeout(() => {
        midAnimation();
      }, 500);
  
      setTimeout(() => {
        mid2Animation();
      }, 700);

      setTimeout(() => {
        endAnimation();
      }, 900); // Duração da animação em milissegundos
    }
  
    // Iniciar a animação a cada 10 segundos
    interval = setInterval(animate, 5000); // Intervalo em milissegundos
  }
    //definindo o elemento pelo ID no html
  const elementoAnimado = document.getElementById('bushRocket_team');
  shakeHorizontal(elementoAnimado);
  

const member = document.getElementById('member');
const bush = document.getElementById('bushRocket_team');

setTimeout(() => {
    member.style.animation = 'slide-rotate-hor-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both';
    
}, 1500);

bush.addEventListener('click', () => {
    

    setTimeout(() => {
        member.style.animation = 'slide-rotate-hor-bottom2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) reverse both';
    }, 500);

    setTimeout(() => {
        member.style.animation = 'shake 0.5s ease-in-out 0.5s 1 both';
    }, 1000);

    setTimeout(() => {
        member.style.animation = 'slide-rotate-hor-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both';
        
    }, 3200); 
  });

  
  const musicContainer = document.getElementById('music');
  const musicON = document.getElementById('musicON');
  const musicOFF = document.getElementById('musicOFF');
  const myMusic = document.getElementById('myMusic');
  let isPlaying = false;
  
  // Define o volume inicial (entre 0 e 1)
  myMusic.volume = 0.5; // Por exemplo, define o volume para 50%

  musicContainer.addEventListener('click', function () {
    if (isPlaying) {
      // Pausa a música
      myMusic.pause();
      isPlaying = false;
      // Altera o ícone para desligado
      musicON.style.display = 'none';
      musicOFF.style.display = 'block';
    } else {
      // Inicia a música
      myMusic.play();
      isPlaying = true;
      // Altera o ícone para ligado
      musicON.style.display = 'block';
      musicOFF.style.display = 'none';
    }
  });
  
  // Função para ajustar o volume
  function setVolume(volumeLevel) {
    if (volumeLevel >= 0 && volumeLevel <= 1) {
      myMusic.volume = volumeLevel;
    }
  }
  
  // Exemplo de uso: define o volume para 2%
  setVolume(0.02);
  
  
  
  const overlay = document.getElementById('overlay');
  const jigglypuff = document.getElementById('jigglypuff-box');
  
  function playSound(volume) {
    var audio = document.getElementById("myAudio");
    audio.volume = volume;
    
    audio.play();
    myMusic.pause();
  }

  jigglypuff.addEventListener('click', () => {
      // Escurece a tela
      if (isPlaying = true){
        myMusic.pause();
        isPlaying = false;
      }
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';

      // Volta ao normal após 32 segundos
      setTimeout(() => {
          overlay.style.opacity = '0';
          overlay.style.pointerEvents = 'none';
          myMusic.pause();
      }, 32000);

      playSound(0.07);
      myAudio.play();
      isPlaying = false;
      musicON.style.display = 'none';
      musicOFF.style.display = 'block';
  });