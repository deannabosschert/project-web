import {
  renderData
} from "./render.js"
const store = {
  async set(res) {
    const photos = await filterData(res)
    console.log(photos)
    console.log("adding photos to localStorage")
    localStorage.setItem("flickrPhotos", JSON.stringify(photos))
    return photos
  },
  note(res) {
    if (window.localStorage.getItem("notitions")) {
      const notitions = JSON.parse(localStorage.getItem("notitions"))
      notitions.push({
        date: res.date,
        note: res.text
      })

      console.log(notitions)
      localStorage.setItem("notitions", JSON.stringify(notitions))
      const currentNotes = JSON.parse(localStorage.getItem("notitions"))

      renderData.notities()
    } else {
      const notitions = [{
        date: res.date,
        note: res.text
      }]
      console.log("adding note to localStorage")
      localStorage.setItem("notitions", JSON.stringify(notitions))

      renderData.notities()
    }

  },
  pinterest(res) {
    console.log(res)
    if (window.localStorage.getItem("pinterestUrls")) {
      const pinterestUrls = JSON.parse(localStorage.getItem("pinterestUrls"))
      pinterestUrls.push(res)

      console.log(pinterestUrls)
      localStorage.setItem("pinterestUrls", JSON.stringify(pinterestUrls))
      const currentBoards = JSON.parse(localStorage.getItem("pinterestUrls"))

      renderData.pinterestboards()
    } else {
      const pinterestUrls = [res]
    
      console.log("adding board to localStorage")
      localStorage.setItem("pinterestUrls", JSON.stringify(pinterestUrls))

      renderData.pinterestboards()
    }

  }
}

async function filterData(data) {
  console.log(data)
  // return data.map(data => {
  //   return {
  //     owner: data.owner,
  //     albumname: data.title,
  //     amount: data.total
  //   }
  // })
  const photoset = {
    owner: data.photoset.ownername,
    albumname: data.photoset.title,
    amount: data.photoset.total,
    photos: data.photoset.photo.map(data => {
      return {
        id: data.id,
        url_small: data.url_s,
        url_large: data.url_l,
        title: data.title,
        tags: data.tags,
        date: data.datetaken
      }
    })
  }


  return photoset
  // console.log(array.photoset)
  // // const photoset = Object.values(array)
  // // console.log(photoset)
  // const photoset = Array.of(array.photoset)

  // const thing = photoset.map(data => {
  //   return {
  //       owner: data.ownername,
  //       albumname: data.title,
  //       amount: data.total
  //       // id: data.photo.id,
  //       // url: data.photo.url_l,
  //       // description: data.photo.title,
  //       // tags: data.photo.tags
  //   }
  // })

  // console.log(thing)
  // return(thing)



  // const albumPhotos = await photoset.photo.map(data => {
  //   return {
  //     owner: data.ownername,
  //     albumname: data.title,
  //     amount: data.title,
  //     id: data.id,
  //     url: data.url_l,
  //     description: data.title,
  //     tags: data.tags
  //   }
  // })

  // return {
  //   eigenaar: albumInfo,
  //   fotootjes: albumPhotos
  // }

}


export {
  store
}