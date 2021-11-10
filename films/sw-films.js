import { films } from '../data/films.js'
import { getLastNumber } from '../utils/index.js'


let filmList = document.querySelector('#filmList')






for(let i = 0; i < films.length; i++){


    const cardDiv = document.createElement('div')
    cardDiv.className = "card leftNav"

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
    
//Get The Correct Film Name
    let figure = document.createElement('figure')
    let figImg = document.createElement('img')
    figImg.className="figImg"
    figImg.src = `https://starwars-visualguide.com/assets/img/films/${i+1}.jpg`
    
    const foundFilm = films.find(film => {
        const convertedString = parseInt(getLastNumber(film.url), 10)
        return convertedString === (i+1)
    })
    
    charName.textContent = foundFilm.title;


//Get Film Year & Producer

    const filmDate = document.createElement('p')
     filmDate.className = "subtitle is-6"
     filmDate.textContent = "Release Date: " + foundFilm.release_date

     const director = document.createElement('p')
     director.className = "subtitle is-6"
     director.textContent = "Director: " + foundFilm.director

     const producer = document.createElement('p')
     producer.className = "subtitle is-6"
     producer.textContent = "Producer(s): "+ foundFilm.producer

    cardDiv.appendChild(imageDiv)
    cardDiv.appendChild(contentDiv)


    imageDiv.appendChild(figure)
    figure.appendChild(figImg)
   
    

    contentDiv.appendChild(media)

    media.appendChild(charName)
    media.appendChild(filmDate)
    media.appendChild(director)
    media.appendChild(producer)
    filmList.appendChild(cardDiv)
    }



    /*
for(let i = 0; i < films.length; i++){
let figure = document.createElement('figure')
let figImg = document.createElement('img')
figImg.src = `https://starwars-visualguide.com/assets/img/films/${i+1}.jpg`
let figCaption = document.createElement('figcaption')


const foundFilm = films.find(film => {
    const convertedString = parseInt(getLastNumber(film.url), 10)
    return convertedString === (i+1)
})

figCaption.textContent = foundFilm.title;

figure.appendChild(figImg)
figure.appendChild(figCaption)
filmList.appendChild(figure)
}
  */

