import {
  fetcher
} from "./helpers/fetcher.js"
import {
  store
} from "./store.js"
import {
  renderData
} from "./render.js"

const loadData = {
  timeline: () => {
    const endpoint = "https://www.flickr.com/services/rest/"
    const method = "flickr.photosets.getPhotos"
    const api_key = "daae0f655b02ece802021848177b2903"
    const user_id = "169241155%40N05"
    const format = "format=json&nojsoncallback=1"
    const photoset_id = "72157718035090188"
    const extras = "extras=license%2C+date_upload%2C+date_taken%2C+owner_name%2C+icon_server%2C+original_format%2C+last_update%2C+geo%2C+tags%2C+machine_tags%2C+o_dims%2C+views%2C+media%2C+path_alias%2C+url_sq%2C+url_l%2C+url_s"
    const apiLink = `${endpoint}?method=${method}&api_key=${api_key}&photoset_id=${photoset_id}&user_id=${user_id}&extras=${extras}&${format}`
    return new Promise((resolve, reject) => {
      fetcher.get(apiLink)
        .then(res => store.set(res))
        .then(() => {
          const photos = JSON.parse(localStorage.getItem("flickrPhotos"))
          // console.log(photos)
          resolve(photos)
          return photos
        })
        .catch(err => {
          reject(console.log(err))
        })
    })
  },
  notes: () => {
    // return new Promise((resolve, reject) => {
    //   getNotes()
    //   .then(res => console.log(res))
    //     .then(() => {
          const notes = JSON.parse(localStorage.getItem("notitions"))
          // console.log(notes)
          // resolve(notes)
          return notes
        // })
        // .catch(err => {
        //   reject(console.log(err))
        // })
    },
    boards: () => {
      // return new Promise((resolve, reject) => {
      //   getNotes()
      //   .then(res => console.log(res))
      //     .then(() => {
            const boards = JSON.parse(localStorage.getItem("pinterestUrls"))
            // console.log(notes)
            // resolve(notes)
            return boards
          // })
          // .catch(err => {
          //   reject(console.log(err))
          // })
      }
  

}




export {
  loadData
}