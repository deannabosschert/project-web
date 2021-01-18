const store = {
  async set(res) {
    const photos = await filterData(res)
    console.log(photos)
    console.log("adding photos to localStorage")
    localStorage.setItem("flickrPhotos", JSON.stringify(photos))
    return photos
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
      url: data.url_l,
      description: data.title,
      tags: data.tags
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