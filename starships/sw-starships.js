import { starships } from "../data/starships.js"
import { getLastNumber, removeChildren } from '../utils/index.js'

const mainContent = document.querySelector('#main')

const cardDiv = document.createElement('div')
cardDiv.className = "card"


const nav = document.querySelector('.nav')

const navList = document.querySelector('.navList')
const shipView = document.querySelector('.displaySection')

const modal = document.querySelector('.modal')
const closeButton = document.querySelector('.modal-close')
const modalBackground = document.querySelector('.modal-background')

const missingMessage = document.querySelector('.missingMessage')

closeButton.addEventListener('click', () => modal.classList.toggle('is-active'))
modalBackground.addEventListener('click', () => modal.classList.toggle('is-active'))

function populateNav(starships) {
  starships.forEach(starship => {
    let anchorWrap = document.createElement('a')
    anchorWrap.className = "yellowUnderline"
    anchorWrap.href = '#main'
    let listItem  = document.createElement('li')
    listItem.textContent = starship.name
    anchorWrap.addEventListener('click', () => {
      populateShipView(starship)
    })

 
    nav.appendChild(navList)
    cardDiv.appendChild(nav)
    nav.appendChild(navList)
    navList.appendChild(anchorWrap)
    anchorWrap.appendChild(listItem)
    mainContent.appendChild(cardDiv)
    
    
  })
}

populateNav(starships)

function populateShipView(shipData) {
  removeChildren(shipView)
  let toShow = 1;
 
  let shipImage = document.createElement('img')
  let shipNum = getLastNumber(shipData.url)

  const shipCard = document.createElement('div')
    shipCard.className = "card shipDisplay"

    //create a bulma "image div"
    const imageDiv = document.createElement('div')
    imageDiv.className = "card-image is-centered"

    const media = document.createElement('div')
    media.className = "media-content"

    const ShipName = document.createElement('p')
    ShipName.className = "title is-4"
    ShipName.textContent = shipData.name;

    const ShipCost = document.createElement('p')
    ShipCost.className = "title is-6"
    ShipCost.textContent = "Cost: ₹" +  shipData.cost_in_credits + "credits";

    const shipClass = document.createElement('p')
    shipClass.className = "title is-6"
    shipClass.textContent = "Class: " + shipData.starship_class ;

    const hyperRating = document.createElement('p')
    hyperRating.className = "title is-6"
    hyperRating.textContent = "Hyperdrive Rating: " + shipData.hyperdrive_rating ;
    
   
  
    
    
    
    
    
    shipView.appendChild(shipCard)

  shipImage.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`
  shipImage.addEventListener('error', () => {
    shipImage.hidden = true
    shipCard.hidden = true;
  
  
    shipCard.classList.toggle('hidden')
    modal.classList.toggle('is-active')
   
    missingMessage.textContent = `The ship ${shipData.name} is not availible for a test drive. Please select another ship.`

    })

    
      shipCard.appendChild(imageDiv)
      imageDiv.appendChild(shipImage)
      
      shipCard.appendChild(media)
      media.appendChild(ShipName)
      media.appendChild(ShipCost)
      media.appendChild(shipClass)
      media.appendChild(hyperRating)
    
    
   
  
  
    
  

 



  
}
