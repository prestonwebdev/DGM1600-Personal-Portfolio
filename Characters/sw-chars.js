import { people } from '../data/people.js'

const mainContent = document.querySelector('#main')


people.forEach((element) => {

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

function getLastNumber(url)
{
  let end = url.lastIndexOf('/')
  let start = end - 2
  if(url.charAt(start) === '/'){
      start++;
  }
  
  return url.slice(start, end)
}


getLastNumber('https//:alskdfjasdf /.com')