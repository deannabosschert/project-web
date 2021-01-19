import {
  router
} from "./modules/checkRoutes.js"
import {
  loadingState
} from "./modules/loader.js"
import {
  store
} from "./modules/store.js"

(function init() {
  (async function checkLocalStorage() {
    const storage = window.localStorage
    loadingState('active')
    if (storage.getItem("flickrPhotos") === null) {
      console.log("nog geen data in je localStorage, incoming!")
      await router.noData()
      loadingState('')
    } else {
      console.log("nu zit er (wel) data in je localStorage 🤓")
      router.hasData()
      loadingState('')
    }
  })()


})()


const searchUnsplash = document.querySelector('.searchUnsplash')
const addNote = document.querySelector('.addNote')

searchUnsplash.addEventListener('submit', unsplash)
addNote.addEventListener('submit', note)

function unsplash() {
  const input = document.getElementById("unsplash-search")
  const searchTerm = input.value.toUpperCase()

  const endpoint = "https://api.unsplash.com"
  // const searchTerm = "trees"
  const count = "12"
  const clientID = "WgCeJ15nZWDOCklDsGksqOag8Xb4TvCILMy5datSx7w"
  const apiLink = `${endpoint}/photos/random/?count=${count}&query=${searchTerm}&client_id=${clientID}`


  // const username = "deannabosschert"
  // const clientId = "client_id=WgCeJ15nZWDOCklDsGksqOag8Xb4TvCILMy5datSx7w"
  // const apiLink = `${endpoint}users/${username}/photos/?${clientId}`

  const gallery = document.querySelector('.masonry-with-columns')
  const searchResults = document.querySelector('.searchResults')

  fetch(apiLink)
    .then(res => res.json())
    .then(data => renderPhotos(data))
  // .then(data => fillMasonry(data))

  function renderPhotos(data) {
    console.log(data)
    searchResults.innerHTML = `Search results for: <span>${searchTerm}</span>`
    gallery.innerHTML = ""

    return data.map(data => {
      // console.log(data.urls.regular)
      gallery.innerHTML +=
        `
      <article>
      <figure>
        <img style="border: 6.5px solid ${data.color};" src="${data.urls.regular}" alt="${data.alt_description}">
      </figure>
      </article>
      `
    })
  }


  // `
  // <article>
  // <figure>
  //   <img  style="border-bottom: 10px solid ${data.color};" src="${data.urls.regular}" alt="${data.alt_description}">
  //   <figcaption>${data.description}</figcaption>
  // </figure>
  // <p>${data.alt_description}</p>
  // </article>
  // `
  event.preventDefault();
}

// document.getElementById('datePicker').valueAsDate = new Date()

function note() {
  const textInput = document.getElementById("add-notition")
  const dateInput = document.getElementById("datePicker")

  const data = {
    text: textInput.value,
    date: dateInput.value
  }

  store.note(data)
  event.preventDefault();
  textInput.value = ""
}