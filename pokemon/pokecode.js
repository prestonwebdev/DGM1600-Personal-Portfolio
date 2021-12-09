import { removeChildren } from '../utils/index.js'

//Query Selectors
let input = document.querySelector("#searchBar") //search
const pokeGrid = document.querySelector('.pokeGrid')  // Pokemon Grid
const newButton = document.querySelector('.newPokemon')  //Create A Pokemon Button
const fivePokeDiv = document.querySelector('.fivePokeDiv') //See More Pokemon Button
const showMore = document.querySelector('.showMore') //See More Pokemon Button
const main = document.querySelector('#main')
const newPokeDiv = document.querySelector('.newPokeDiv')
let showNum = 0
let showAll = document.createElement('button')
showAll.id = "showAll"
showAll.className = "button"
showAll.textContent = "Show More Pokemon"



//Event Listeners 



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
  populateNewPokeCard(newPokemon)
})






//Search For Pokemon Event Listener
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    let userIn = input.value
    findPokemon(userIn)
   let element = document.getElementById('scroll')
   
   element.scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
    
  }
});

//show More Pokemon Event Listener 
showAll.addEventListener('click', () => {
  loadPokemon((15, showNum))
 showNum += 15

})


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
function loadPokemon(offset = 0, limit = 15) {
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

function findPokemon(value) {

  removeChildren(pokeGrid)
  getAPIData(`https://pokeapi.co/api/v2/pokemon/${value}`).then((data) =>
    populatePokeCard(data)
  )
}

function loadSinglePoke(value) {

  removeChildren(pokeGrid)
  getAPIData(`https://pokeapi.co/api/v2/pokemon/${value}`).then((data) =>
    populate5PokeCards(data)
  )
}




//Function To Popoulate the Pokemon Card 
function populatePokeCard(singlePokemon) {
  const pokeScene = document.createElement('div')
  pokeScene.className = 'scene'
  const pokeCard = document.createElement('div')
  pokeCard.className = 'mycard'
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


//In future I will most likely pass in a variable with the location to populate pokecard to eliminate extra code. 
//Populate Function Slightly modified for New Pokemon
function populateNewPokeCard(singlePokemon) {
  const pokeScene = document.createElement('div')
  pokeScene.className = 'scene'
  const pokeCard = document.createElement('div')
  pokeCard.className = 'mycard'
  pokeCard.addEventListener('click', () =>
    pokeCard.classList.toggle('is-flipped'),
  )
  const front = populateCardFront(singlePokemon)
  const back = populateCardBack(singlePokemon)

  pokeCard.appendChild(front)
  pokeCard.appendChild(back)
  pokeScene.appendChild(pokeCard)
  newPokeDiv.appendChild(pokeScene)
}

//Modified function to display the first few pokemon and then hide them when the show more button is clicked. 
function populate5PokeCards(singlePokemon) {
  const pokeScene1 = document.createElement('div')
  pokeScene1.className = 'scene1'
  const pokeCard = document.createElement('div')
  pokeCard.className = 'mycard'
  pokeCard.addEventListener('click', () =>
    pokeCard.classList.toggle('is-flipped'),
  )

  showAll.addEventListener('click', () => {
  
    fivePokeDiv.classList = ".hide"
    pokeScene1.classList = ".hide"
  
  
  })

  const front = populateCardFront(singlePokemon)
  const back = populateCardBack(singlePokemon)

  pokeCard.appendChild(front)
  pokeCard.appendChild(back)
  pokeScene1.appendChild(pokeCard)
  fivePokeDiv.appendChild(pokeScene1)
  
  pokeGrid.appendChild(fivePokeDiv)
  showMore.appendChild(showAll)
  main.appendChild(showMore)
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
  const imgDiv = document.createElement('div')
  imgDiv.className = 'imgDiv'
  let smallPoke = document.createElement('img')
  smallPoke.className = 'smallPoke'

  smallPoke.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`

  smallPoke.addEventListener("error", function(event) {
    event.target.src = "../images/pokeball.png"
    event.onerror = null
  })

  const pokeName = document.createElement('h2')
  pokeName.className = 'pokeName'
  pokeName.textContent = `${pokemon.name}`
  const label = document.createElement('h2')

    const hp = document.createElement('h3')
    hp.textContent = `Health: ${pokemon.stats[0].base_stat}`
    const hpBar = document.createElement('progress')
    hpBar.classList = 'progress is-success'
    hpBar.value = `${pokemon.stats[0].base_stat}`
    console.log()
    hpBar.max = '100'

    const attack = document.createElement('h3')
    attack.textContent = `Attack: ${pokemon.stats[1].base_stat}`
    const attackBar = document.createElement('progress')
    attackBar.classList = 'progress is-danger'
    attackBar.value = `${pokemon.stats[1].base_stat}`
    console.log()
    attackBar.max = '100'

    const defence = document.createElement('h3')
    defence.textContent = `Defence: ${pokemon.stats[2].base_stat}`
    const defBar = document.createElement('progress')
    defBar.classList = 'progress is-info'
    defBar.value = `${pokemon.stats[2].base_stat}`
    console.log()
    defBar.max = '100'
   

  imgDiv.appendChild(smallPoke)
  imgDiv.appendChild(pokeName)
  pokeBack.appendChild(imgDiv)
  pokeBack.appendChild(label)

  pokeBack.appendChild (hp)
  pokeBack.appendChild(hpBar)

  pokeBack.appendChild(attack)
  pokeBack.appendChild(attackBar)

  
  pokeBack.appendChild(defence)
  pokeBack.appendChild(defBar)
  
  return pokeBack
}


//Changes Card Color Based on Pokemon Type
function typesBackground(pokemon, card) {
  let pokeType1 = pokemon.types[0].type.name
  let pokeType2 = pokemon.types[1]?.type.name
  if (!pokeType2) {
    card.style.setProperty('border',
    `10px Solid ${getPokeTypeColor(pokeType1)}`)
  } else {
    card.style.setProperty('border',
    `10px solid `)


    card.style.setProperty('border-image',
    ` linear-gradient(${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(pokeType2)}) 30 `)
   
  }
}


//Gets the type of the pokemon and returns the color for that type to be modified. 
function getPokeTypeColor(pokeType) {
  let color
  switch (pokeType) {
    case 'grass':
      color = '#00ff0022'
      break
      case 'fire':
      color = '#ff000022'
      break
      case 'water':
      color = '#0000ff22'
      break
      case 'bug':
      color = '#7fff0022'
      break
      case 'normal':
      color = '#f5f5dc22'
      break
      case 'flying':
      color = '#00ffff22'
      break
      case 'poison':
      color = '#c300ff22'
      break
      case 'electric':
      color = '#c8ff0022'
      break
      case 'psychic':
      color = '#e96c9522'
      break
      case 'ground':
      color = '#ceb25022'
      break
      case 'rock':
      color = '#44444422'
      break
      default:
        color = '#99999910'
  }
  return color
}



//loads First 4 pokemon on screen
  function firstpoke(){
  loadSinglePoke(1)
  loadSinglePoke(4)
  loadSinglePoke(7)
  loadSinglePoke(25)
  }


  firstpoke()


// Object Class For Creating a New Pokemon 
class Pokemon {
  constructor(name, height, weight, abilities) {
    ;(this.id = 9001),
      (this.name = name),
      (this.height = height),
      (this.weight = weight),
      (this.types = [
        {
          slot: 1,
          type: {
            name: "normal",
            url: "https://pokeapi.co/api/v2/type/1/"
          }
        }
      ]),
      (this.stats = [
        {
          base_stat: 100,
          effort: 1,
          stat: {
            name: "hp",
            url: "https://pokeapi.co/api/v2/stat/1/"
          }
        },

        {
          base_stat: 100,
          effort: 1,
          stat: {
            name: "hp",
            url: "https://pokeapi.co/api/v2/stat/1/"
          }
        }, 
        {
          base_stat: 100,
          effort: 1,
          stat: {
            name: "hp",
            url: "https://pokeapi.co/api/v2/stat/1/"
          }
        }


      ]),
      (this.abilities = abilities)
  }
}