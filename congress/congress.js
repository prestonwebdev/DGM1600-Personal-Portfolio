import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../utils/index.js'

const members = [...senators, ...representatives] // modern way to combine arrays like a genus!

const senatorDiv = document.querySelector('.senators')
const loyaltyHeading = document.querySelector('.mostLoyal')
const seniorityHeading = document.querySelector('.seniority')
const mostSenior = document.querySelector('.bio')
const senInfo = document.querySelector('.info')
const senButton = document.querySelector('#senbutton')
const representButton = document.querySelector('#representButton')
const repubButton = document.querySelector('#repubButton')
const demButton = document.querySelector('#demButton')
const showAll = document.querySelector('#showAll')
const navButtons = document.querySelector('#navButtons')

const fiveSen = document.querySelector('.fivesen')


















function SimplifiedMembers(chamberFilter) {
  const filteredArray = members.filter((member) =>
    chamberFilter ? member.short_title === chamberFilter : member,
  )

  return filteredArray.map((senator) => {
    let middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
    return {
      id: senator.id,
      name: `${senator.first_name}${middleName}${senator.last_name}`,
      party: senator.party,
      gender: senator.gender,
      seniority: +senator.seniority,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
      url: senator.url,
      missedVotesPct: senator.missed_votes_pct,
      loyaltyPct: senator.votes_with_party_pct,
      title: senator.short_title,
    }
  })
}

function populateSenatorDiv(simpleSenators) {
  removeChildren(senatorDiv)
  
  simpleSenators.forEach((senator) => {
    const senFigure = document.createElement('figure')
    const figImg = document.createElement('img')
    const figCaption = document.createElement('figcaption')
    

    figImg.src = senator.imgURL
    figCaption.textContent = senator.name

    senFigure.appendChild(figImg)
    senFigure.appendChild(figCaption)
    senatorDiv.appendChild(senFigure)
    


  })



}






//Most Senior Senator Section

const mostSeniorMember = SimplifiedMembers().reduce((acc, senator) =>
  acc.seniority > senator.seniority ? acc : senator,
)

mostSenior.appendChild(seniorityHeading)
const seniorFigure = document.createElement('figure')
const seniorImg = document.createElement('img')
seniorImg.src = mostSeniorMember.imgURL
seniorFigure.appendChild(seniorImg)
mostSenior.appendChild(seniorFigure)


const info = document.createElement ('ul')
const item1 = document.createElement('li')
const item2 = document.createElement('li')
const item3 = document.createElement('li')

const name = document.createElement('p')
name.textContent = mostSeniorMember.name
name.className ="senatorName"
const seniorityNum = document.createElement('p')
seniorityNum.textContent = "Years of Service: " + mostSeniorMember.seniority
const senParty = document.createElement('P')
senParty.textContent = "Party: " + mostSeniorMember.party

const senBio = document.createElement('p')
senBio.textContent = "Congressman Don Young was re-elected to the 117th Congress in 2020 to serve his 25th term as Alaska’s only Member of the United States House of Representatives. First sworn in as a freshman to the 93rd Congress after winning a special election on March 6, 1973, Congressman Young is today the Dean of the House and the longest serving member of the current Congress."

info.appendChild(item1)
item1.appendChild(name)
info.appendChild(item2)
item2.appendChild(seniorityNum)

info.appendChild(item3)
item3.appendChild(senParty)


senInfo.appendChild(info)
senInfo.appendChild(senBio)








const filterSenators = (prop, value) => SimplifiedMembers().filter(member => member[prop] === value)








const mostLoyal = SimplifiedMembers().reduce((acc, senator) => {
  if (senator.loyaltyPct === 100) {
    acc.push(senator)
  }
  return acc
}, [])

const cowardList = document.createElement('ul')

const spineless = mostLoyal.map((coward) => {
  let listItem = document.createElement('li')
  listItem.className = "loyaltyList"
  listItem.textContent = coward.name + " | "
  cowardList.appendChild(listItem)
})

loyaltyHeading.appendChild(cowardList)





senButton.addEventListener('click', () => populateSenatorDiv(filterSenators('title', 'Sen.')))
representButton.addEventListener('click', () => populateSenatorDiv(filterSenators('title', 'Rep.')))
repubButton.addEventListener('click', () => populateSenatorDiv(filterSenators('party', "R")))
demButton.addEventListener('click', () => populateSenatorDiv(filterSenators('party', "D")))

showAll.addEventListener('click', () => {
  populateSenatorDiv(SimplifiedMembers())
  showAll.className = "hide"
  fiveSen.className= "hide"
  navButtons.classList.remove("hide")


})







function populateSen5(simpleSenators) {
  
  
  for(let i = 0; i < 5; i++)  {
    let senator = simpleSenators[i]
    const senFigure1 = document.createElement('figure')
    const figImg1 = document.createElement('img')
    const figCaption1 = document.createElement('figcaption')

    figImg1.src = senator.imgURL
    figCaption1.textContent = senator.name

    senFigure1.appendChild(figImg1)
    senFigure1.appendChild(figCaption1)
    fiveSen.appendChild(senFigure1)
  }


}

populateSen5(SimplifiedMembers())