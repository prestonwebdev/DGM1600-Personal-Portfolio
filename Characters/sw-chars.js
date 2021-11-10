import { people } from '../data/people.js'
import { getLastNumber, removeChildren } from '../utils/index.js'

const mainContent = document.querySelector('#main')

const maleCharacters = people.filter((person) => person.gender === 'male')
const femaleCharacters = people.filter((person) => person.gender === 'female')
const otherCharacters = people.filter((person) => {
  if (
    person.gender !== 'male' &&
    person.gender !== 'female' 
  ) {
    return person
  }
})

const header = document.createElement('header')


//Create Filter Buttons
const maleButton = document.createElement('button')
maleButton.className = "sortButton"
maleButton.textContent = 'Male Characters'

const otherButton = document.createElement('button')
otherButton.className = "sortButton"
otherButton.textContent = 'Other Characters'

const femaleButton = document.createElement('button')
femaleButton.className = "sortButton"
femaleButton.textContent = 'Female Characters'


populateDOM(people)

maleButton.addEventListener('click', () => populateDOM(maleCharacters))

femaleButton.addEventListener('click', () => populateDOM(femaleCharacters))

otherButton.addEventListener('click', () => populateDOM(otherCharacters))



const filters = document.createElement('div')
filters.className ="filterDiv"
mainContent.appendChild(filters)
filters.appendChild(maleButton)
filters.appendChild(femaleButton)
filters.appendChild(otherButton)

document.body.insertBefore(header, mainContent)
document.body.insertBefore(filters, mainContent)





function populateDOM(characters) {
  // clear the page first, then populate
  removeChildren(mainContent)
  characters.forEach((element) => {

    //create a bulma "card div"
    const cardDiv = document.createElement('div')
    cardDiv.className = "card"

    //create a bulma "image div"
    const imageDiv = document.createElement('div')
    imageDiv.className = "card-image is-centered"


    //create a bulma "image content div"
     const contentDiv = document.createElement('div')
     contentDiv.className = "card-content"

     //create bulma "media div"
     const media = document.createElement('div')
     media.className = "media-content"

     
     const charName = document.createElement('p')
     charName.className = "title is-4"
     charName.textContent = element.name

     const birthDate = document.createElement('p')
     birthDate.className = "subtitle is-6"
     birthDate.textContent = "Birth Year: " + element.birth_year


     const charGender = document.createElement('p')
     charGender.className = "subtitle is-6"
     charGender.textContent = "Gender: " + element.gender


     




    const charFigure = document.createElement('figure')
    charFigure.className = "image is-4by3 is-centered"


    const charImg = document.createElement('img')
    const charNum = getLastNumber(element.url)
    charImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`

    const charCaption = document.createElement('figcaption')
    charCaption.textContent = element.name

    
    cardDiv.appendChild(imageDiv)
    cardDiv.appendChild(contentDiv)
    
    imageDiv.appendChild(charFigure)
    charFigure.appendChild(charImg)

    
    contentDiv.appendChild(media)
    media.appendChild(charName)
    media.appendChild(birthDate)
    media.appendChild(charGender)
    mainContent.appendChild(cardDiv)
  })
}

/*
function populateDOM(characters) {
  // clear the page first, then populate
  removeChildren(mainContent)
  characters.forEach((element) => {
    const charFigure = document.createElement('figure')
    const charImg = document.createElement('img')
    const charNum = getLastNumber(element.url)
    charImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`

    const charCaption = document.createElement('figcaption')
    charCaption.textContent = element.name

    charFigure.appendChild(charImg)
    charFigure.appendChild(charCaption)
    mainContent.appendChild(charFigure)
  })
}
*/