import{ senators } from '../Data/senators.js'

const senatorDiv = document.querySelector('.senators')


function SimplifiedSenators(senatorArray){
    return senatorArray.map(senator => {

        let middleName = senator.middle_name ? ` ${senator.middleName} ` : ` `
        return{
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.first_name}`,
            party: senator.party,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`
        }
    })
}


function populateSenators(simpleSenators){
simpleSenators.forEach(senator => {
    const senFigure = document.createElement('figure')
    const figImg = document.createElement('img')
    const figImg = document.createElement('figcaption')

    figImg.src = senator.imgURL
    figCaption.textContent = senator.name

    senFigure.appendChild(figImg)
    senFigure.appendChild(figCaption)
    senatorDiv.appendChild(senFigure)
})
}