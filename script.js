const $form = document.getElementById('form')
const $date = document.getElementById('date')
const $favorites = document.getElementById('favorites')
const $apImg = document.getElementById('apImg')
const $apod = document.getElementById('apod')
const $btnApod = document.getElementById('btnApod')
const $asearch = document.getElementById('asearch')
const $overlay = document.getElementById('overlay')

let favorites = []



function buildFavorites(){
    const html =[]

    for (let i = 0; i < favorites.length; i++) {
        const fav = favorites[i]
        html.push(`<div class="
        list-group-item
        d-flex
        align-items-center
        p-3
        mb-3">
        
        <div class="me-auto clearfix">
        <img class="apImg col-1 float-start mx-3 rounded" src="${fav.url}" alt="${fav.title}">
        <p>
          <strong>${fav.title}</strong><br>
          <em>${fav.date}</em>
        </p>
      </div>
      <button class="delete btn btn-danger"
        data-index="${i}">Delete</button>
        </div>`)
        }
  $favorites.innerHTML = html.join('')


}


$form.addEventListener('submit', 
  async function (e) {
    e.preventDefault()

    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=cruHNWF3fIGkgabhwF9DpKSWCMsAYCnJyyBdA1AW&date=' + $date.value)

    // use the response to get json
    const json = await response.json()

    // console.log(json)

    // add new json data to colors array
    favorites.push(json)
    $apod.innerHTML = `<div id="asearch" class="asearch">
    
    <div class="aimage"><img id="image" src="${json.url}" alt="${json.title}" class="img" width="100%"></div>
    <div class="atext"><h2 id="title">${json.title}</h2>
    <p id="adate">Date: <em>${json.date}</em></p>
    <p id="explanation">${json.explanation}</p>
    <button id="btnApod" class="addfav btn btn-primary">Save to favorites</button></div>
    </div>`

    localStorage.setItem('favs', JSON.stringify(favorites))

    
    
})

$apod.addEventListener('click', async function(e){
  console.log(e.target)
  e.preventDefault()
  const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=cruHNWF3fIGkgabhwF9DpKSWCMsAYCnJyyBdA1AW&date=' + $date.value)

    // use the response to get json
  const json = await response.json()


  if(e.target.classList.contains('img')){

      $overlay.innerHTML = `<img class="overlayimg" src="${json.hdurl}" alt="${json.title}" width="100%"> `
      $overlay.classList.add('show')
  }

})

$overlay.addEventListener('click', function(){
  $overlay.classList.remove('show')
})
$apod.addEventListener('click', function(e){
  if(e.target.classList.contains('addfav')){
    
    buildFavorites()

  }
  
})
$favorites.addEventListener('click', function(e){
  if(e.target.classList.contains('delete')){
    const index = e.target.dataset.index
    favorites.splice(index,1)
    localStorage.setItem('favs', JSON.stringify(favorites))

  }
  buildFavorites()
})

const ls = localStorage.getItem('favs')

if (ls){
  favorites = JSON.parse(ls)
  buildFavorites()

}









