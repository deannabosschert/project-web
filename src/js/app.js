import {
  router
} from "./modules/checkRoutes.js"
import {
  loadingState
} from "./modules/loader.js"
import {
  store
} from "./modules/store.js"
import {
  renderData
} from "./modules/render.js"

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
const findPinterest = document.querySelector('.findPinterest')

const addNote = document.querySelector('.addNote')
// const openNotes = document.querySelector('.openNotes')
// const deleteNote = document.querySelector('.close')
const sortNoteAsc = document.querySelector('.sortByDateAsc')
const sortNoteDesc = document.querySelector('.sortByDateDesc')

const paragraphToEdit = document.querySelector('.editParagraph')
const addCommentButton = document.querySelector('.addComment')
const addRatingButton = document.querySelector('.addRating')
paragraphToEdit.addEventListener('click', editParagraph)
addCommentButton.addEventListener('click', addComment)
addRatingButton.addEventListener('click', addRating)


searchUnsplash.addEventListener('submit', unsplash)
findPinterest.addEventListener('submit', pinterest)
addNote.addEventListener('submit', note)
sortNoteAsc.addEventListener('click', sortNotesAsc)
sortNoteDesc.addEventListener('click', sortNotesDesc)

// deleteNote.addEventListener('click', removeNote)
// openNotes.addEventListener('click', loadNotes)

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

  const gallerySection = document.querySelector('.unsplashGallery')
  const gallery = document.querySelector('.masonry-with-columns')
  const searchResults = document.querySelector('.searchResults')

  fetch(apiLink)
    .then(res => res.json())
    .then(data => renderPhotos(data))
  // .then(data => fillMasonry(data))

  function renderPhotos(data) {
    // console.log(data)
    if (searchTerm == "") {
      searchResults.innerHTML = `Search results for: <span>a random search!</span>`
    } else {
      searchResults.innerHTML = `Search results for: <span>${searchTerm}</span>`
    }

    gallery.innerHTML = ""
    gallerySection.classList.remove('placeholder')

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

document.getElementById('datePicker').valueAsDate = new Date()

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


function pinterest() {
  const input = document.getElementById("pinterest-search")
  let url = input.value
  if (url == "") {
    console.log('load board from randomURL')
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    const randomURLs = ["https://nl.pinterest.com/dbosschert/austria/","https://nl.pinterest.com/dbosschert/winter-wonderland/","https://nl.pinterest.com/dbosschert/forest-fun/","https://nl.pinterest.com/dbosschert/wonderful-waterfall/"]
    const randomUrlIndex= getRandomInt(4)
    const randomURL = randomURLs[randomUrlIndex]
    url = randomURL
    store.pinterest(url)

  } else {
    store.pinterest(url)

  }
  event.preventDefault();
  input.value = ""
}

function sortNotesAsc() {
  sortNoteDesc.classList.remove('buttonPressed')
  sortNoteAsc.classList.add('buttonPressed')


  const notitions = JSON.parse(localStorage.getItem("notitions"))
  console.log(notitions)
  const sortedNotitions = notitions.sort(compareAsc);

  // const sortedNotitions = notitions.sort((a, z) => a - z)
  console.log(sortedNotitions)
  renderData.notitiesSort(sortedNotitions)
}

function compareAsc(a, b) {
  const dateA = a.date;
  const dateB = b.date;

  let comparison = 0;
  if (dateA > dateB) {
    comparison = 1;
  } else if (dateA < dateB) {
    comparison = -1;
  }
  return comparison;
}

function sortNotesDesc() {
  sortNoteAsc.classList.remove('buttonPressed')
  sortNoteDesc.classList.add('buttonPressed')
  const notitions = JSON.parse(localStorage.getItem("notitions"))
  console.log(notitions)
  const sortedNotitions = notitions.sort(compareDesc);

  // const sortedNotitions = notitions.sort((a, z) => a - z)
  console.log(sortedNotitions)
  renderData.notitiesSort(sortedNotitions)
}

function compareDesc(a, b) {
  const dateA = a.date;
  const dateB = b.date;

  let comparison = 0;
  if (dateA > dateB) {
    comparison = 1;
  } else if (dateA < dateB) {
    comparison = -1;
  }

  //invert return value by multiplying by -1
  return comparison * -1;
}


/* returns [
  { name: 'Steven Tyler', band: 'Aerosmith',  born: 1948 },
  { name: 'Stevie Nicks', band: 'Fleetwood Mac', born: 1948 },
  { name: 'Kurt Cobain', band: 'Nirvana', born: 1967 },
  { name: 'Karen Carpenter', band: 'The Carpenters', born: 1950 }
] */

// function loadNotes() {
//   console.log('hahahahaha')
//   const storage = window.localStorage
//   if (storage.getItem("notitions") === null) {
//     console.log('niets in notesStorage on click')
//     return
//   } else {
//     console.log('wel in notesStorage on click, ga naar router')
//     router.noData()
//   }
// }


// function removeNote() {
//   console.log('aboutt to remove stuff')
//   var x = document.getElementById("myLI").parentNode.nodeName;
//   console.log(x)
// }


// Delete function. used "for" to bind delete button with 
// coresponding stickynote
// let stickies = document.getElementsByClassName("sticky");
// let xs = document.querySelector(".close");
// let noteContainer = document.querySelector(".saved-notitions");

// const closeButtons = noteContainer.querySelectorAll(".close");
// const allNotes = noteContainer.querySelectorAll(".sticky");
// console.log(allNotes)

// console.log(closeButtons)
// for (let i = 0; i < stickies.length; i++){
//   xs[i].addEventListener("click", ()=> {
//       console.log(stickies.length);
//       stickies[i].style.display = "none";
//       router.noData()

//   });
// }
// mountCloses()

// function mountCloses() {
//   // let xs = document.querySelector(".close");
//   // let noteContainer = document.querySelector(".saved-notitions");
//   // const highlightedItems = noteContainer.querySelectorAll(".close");
//   let noteContainer = document.querySelector(".saved-notitions");

//   let allNotes = noteContainer.querySelectorAll(".sticky");
//   console.log(allNotes)
//   // let allNotesArray = Array.from(allNotes)
//   // console.log(allNotesArray)

//   for (let i = 0; i < allNotes.length; i++) {
//     console.log(sticky)
//   }


// }

// xs.addEventListener('click', () => {
//   console.log('yeet')
//   var x = xs.parentElement
//   console.log(x)

// })

// xs.addEventListener('click', () => {
//   var x = xs.parentElement

//   // for (let i = 0; i < stickies.length; i++) {

//   // }
//   console.log(x)

// })
// activeSection.classList.add('active')

function editParagraph() {
  const parenty = paragraphToEdit.parentElement
  // console.log(parenty)
  const paragraph = parenty.querySelector(".dayParagraph")
  // console.log(paragraph)

  paragraph.setAttribute("contenteditable", "true")
  paragraph.focus()

}

function addRating() {

}