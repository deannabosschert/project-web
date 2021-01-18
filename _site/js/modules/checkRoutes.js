import {
  renderPhotos
} from "./render.js"
import {
  loadPhotos
} from "./API.js"


// async function route() {
const router = {
  noData() {
    // if (data === 'dataPresent')
    routie({
      '/': () => {
        const loadData = loadPhotos.timeline()
        loadData.then(photos => {
          renderPhotos.timeline(photos)
          updatePageUI('/')
        })
      },
      '': () => {
        const loadData = loadPhotos.timeline()
        loadData.then(photos => {
          renderPhotos.timeline(photos)
          updatePageUI('/')
        })
      },
      notities: () => {
        const loadData = loadPhotos.timeline()
        loadData.then(photos => {
          renderPhotos.notities(photos)
          updatePageUI('notities')
        })
      },
      // '/:id': id => {
      //   const loadData = loadPhotos.timeline()
      //   loadData.then(photos => {
      //     let onephoto = photos.filter(function(photo) {
      //       return photo.id == id
      //     })
      //     renderPhotos.detail(onephoto)
      //   })
      //   updatePageUI('pictureDetail')
      // }
    })
  },
  hasData() {
    const photos = JSON.parse(localStorage.getItem("flickrPhotos"))
    // const photoAvatars = JSON.parse(storage.getItem("githubAvatars"))

    routie({
      '/': () => {
        renderPhotos.timeline(photos)
        updatePageUI('/')
      },
      '': () => {
        renderPhotos.timeline(photos)
        updatePageUI('/')
      },
      notities: () => {
        renderPhotos.notities(photos)
        updatePageUI('notities')
      },
      inspiratie: () => {
        updatePageUI('inspiratie')
      // },
      // '/:id': id => {
      //   let onephoto = photos.filter(function(photo) {
      //     return photo.id == id
      //   })
      //   renderPhotos.detail(onephoto)
      //   updatePageUI('pictureDetail')
      //   // http://localhost:8000/src/#/237659708
      }
    })

  }
}

// update page from route
function updatePageUI(route) {
  // console.log(route)
  const tabs = document.querySelectorAll('.tab')
  tabs.forEach(tab => {
    tab.classList.remove('active')
  })

  const activeSection = document.querySelector(`[data-route="${route}"]`)
  // console.log(activeSection)
  activeSection.classList.add('active')
}

// }

export {
  router
}