import {
  renderData
} from "./render.js"
import {
  loadData
} from "./API.js"


// async function route() {
const router = {
  noData() {
    // if (data === 'dataPresent')
    routie({
      '/': () => {
        const loadPhotos = loadData.timeline()
        loadPhotos.then(photos => {
          renderData.timeline(photos)
          updatePageUI('/')
        })
      },
      '': () => {
        const loadPhotos = loadData.timeline()
        loadPhotos.then(photos => {
          renderData.timeline(photos)
          updatePageUI('/')
        })
      },
      inspiratie: () => {
        console.log('nodatainspi')

          updatePageUI('inspiratie')
      },
      notities: () => {
        console.log('nodatanotities')

        const storage = window.localStorage
        if (storage.getItem("notitions") === null) {
          updatePageUI('notities')
          return
        } else {
          // const notes = JSON.parse(localStorage.getItem("notities"))
          const loadNotes = loadData.notes()
          loadNotes.then(data => {
            renderData.notities(data)
            updatePageUI('notities')
          })
        }

       

      // },
      // '/:id': id => {
      //   const loadDing = loadData.timeline()
      //   loadDing.then(photos => {
      //     let onephoto = photos.filter(function(photo) {
      //       return photo.id == id
      //     })
      //     renderData.detail(onephoto)
      //   })
      //   updatePageUI('pictureDetail')
      }
    })
  },
  hasData() {
    const photos = JSON.parse(localStorage.getItem("flickrPhotos"))
    // const photoAvatars = JSON.parse(storage.getItem("githubAvatars"))

    routie({
      '/': () => {
        renderData.timeline(photos)
        updatePageUI('/')
      },
      '': () => {
        renderData.timeline(photos)
        updatePageUI('/')
      },
      notities: () => {
        console.log('hasflickrdatanotities')
        // renderData.notities(photos)
        const storage = window.localStorage
        if (storage.getItem("notitions") === null) {
          updatePageUI('notities')
          return
        } else {
          // const notes = JSON.parse(localStorage.getItem("notities"))
          const loadedNotes = loadData.notes()
            renderData.notities(loadedNotes)
            updatePageUI('notities')
          
        }
      },
      inspiratie: () => {
        console.log('hasflickrdatainspiratie')

        updatePageUI('inspiratie')
      // },
      // '/:id': id => {
      //   let onephoto = photos.filter(function(photo) {
      //     return photo.id == id
      //   })
      //   renderData.detail(onephoto)
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