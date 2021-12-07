import { removeChildren } from '../utils/index.js'

//Query Selectors
let input = document.querySelector("#searchBar") //search
const pokeGrid = document.querySelector('.pokeGrid')  // Pokemon Grid
const loadButton = document.querySelector('.loadPokemon')  // Load Pokemon Button
const newButton = document.querySelector('.newPokemon')  //Create A Pokemon Button
const morePokemon = document.querySelector('.morePokemon') //Load More Pokemon Button



//Event Listeners 

//Load  Pokemon Button Event Listener
loadButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  loadPokemon()
})

//New Pokemon Button Event Listener
newButton.addEventListener('click', () => {
  let pokeName = prompt('What is the name of your new Pokemon?')
  let pokeHeight = prompt('What is the height of your Pokemon?')
  let pokeAbilities = prompt(
    'What are your Pokemon abilities? (use a comma separated list',
  )
  let newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    3785,
    getAbilitiesArray(pokeAbilities),
  )
  console.log(newPokemon)
  populatePokeCard(newPokemon)
})


//Load More Pokemon Event Listener
morePokemon.addEventListener('click', () => {
  let startPoint = prompt('Which pokemon ID do we start with?')
  let howMany = prompt('How many more Pokemon do you want to see?')
  loadPokemon(startPoint, howMany)
})



//Search For Pokemon Event Listener
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    let userIn = input.value
    findPokemon(userIn)
  }
});


//Functions 

//Get Pokemon Data From The API
function getAPIData(url) {
  try {
    return fetch(url).then((data) => data.json())
  } catch (error) {
    console.error(error)
  }
}


//Function To Load Pokemon To the DOM
function loadPokemon(offset = 0, limit = 25) {
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`,
  ).then(async (data) => {
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) =>
        populatePokeCard(pokeData),
      )
    }
  })
}

//Get Pokemon Abilities Array
function getAbilitiesArray(commaString) {
  let tempArray = commaString.split(',')
  console.log(tempArray)
  return tempArray.map((abilityName) => {
    return {
      ability: {
        name: abilityName,
      },
    }
  })
}





//Funtion to Find Pokemon at the entered Value
function findPokemon(value){

  getAPIData(
    `https://pokeapi.co/api/v2/pokemon/${value}`,
  ).then(async (data) => {
    for (const pokemon of data.results) {
      await getAPIData(data.res.url).then((pokeData) =>
        populatePokeCard(pokeData),
      )
    }
  })
}

  





//Function To Popoulate the Pokemon Card 
function populatePokeCard(singlePokemon) {
  const pokeScene = document.createElement('div')
  pokeScene.className = 'scene'
  const pokeCard = document.createElement('div')
  pokeCard.className = 'card'
  pokeCard.addEventListener('click', () =>
    pokeCard.classList.toggle('is-flipped'),
  )
  const front = populateCardFront(singlePokemon)
  const back = populateCardBack(singlePokemon)

  pokeCard.appendChild(front)
  pokeCard.appendChild(back)
  pokeScene.appendChild(pokeCard)
  pokeGrid.appendChild(pokeScene)
}







//Populate the Front Of the Pokemon Card 
function populateCardFront(pokemon) {
  const pokeFront = document.createElement('figure')
  pokeFront.className = 'cardFace front'
  const pokeImg = document.createElement('img')
  if (pokemon.id === 9001) {
    pokeImg.src = '../images/pokeball.png'
  } else {
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
  }
  const pokeCaption = document.createElement('figcaption')
  pokeCaption.textContent = `${pokemon.name}`
  pokeFront.appendChild(pokeImg)
  pokeFront.appendChild(pokeCaption)

  typesBackground(pokemon, pokeFront)
  
  return pokeFront
}



//Populate The Back Of The Pokemon Card
function populateCardBack(pokemon) {
  const pokeBack = document.createElement('div')
  pokeBack.className = 'cardFace back'
  const label = document.createElement('h4')
  label.textContent = 'Abilities:'
  const abilityList = document.createElement('ul')
  pokemon.abilities.forEach((ability) => {
    let abilityItem = document.createElement('li')
    abilityItem.textContent = ability.ability.name
    abilityList.appendChild(abilityItem)
  })
  pokeBack.appendChild(label)
  pokeBack.appendChild(abilityList)
  return pokeBack
}


//Changes Card Color Based on Pokemon Type
function typesBackground(pokemon, card) {
  let pokeType1 = pokemon.types[0].type.name
  let pokeType2 = pokemon.types[1]?.type.name
  if (!pokeType2) {
    card.style.setProperty('background', getPokeTypeColor(pokeType1))
  } else {
    card.style.setProperty('background',
    `linear-gradient(${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(pokeType2)})`)
  }
}


//Gets the type of the pokemon and returns the color for that type to be modified. 
function getPokeTypeColor(pokeType) {
  let color
  switch (pokeType) {
    case 'grass':
      color = '#00ff00'
      break
      case 'fire':
      color = '#ff0000'
      break
      case 'water':
      color = '#0000ff'
      break
      case 'bug':
      color = '#7fff00'
      break
      case 'normal':
      color = '#f5f5dc'
      break
      case 'flying':
      color = '#00ffff'
      break
      case 'poison':
      color = '#c300ff'
      break
      case 'electric':
      color = '#c8ff00'
      break
      case 'psychic':
      color = '#e96c95'
      break
      case 'ground':
      color = '#ceb250'
      break
      case 'rock':
      color = '#444444'
      break
      default:
        color = '#999999'
  }
  return color
}

// Object Class For Creating a New Pokemon 
class Pokemon {
  constructor(name, height, weight, abilities) {
    ;(this.id = 9001),
      (this.name = name),
      (this.height = height),
      (this.weight = weight),
      (this.abilities = abilities)
  }
}