const endpoint = "https://www.flickr.com/services/rest/"
const method = "flickr.photosets.getPhotos"
const api_key = "daae0f655b02ece802021848177b2903"
const user_id = "169241155%40N05"
const format = "format=json&nojsoncallback=1"
const photoset_id = "72157717231770806"
const extras = "extras=license%2C+date_upload%2C+date_taken%2C+owner_name%2C+icon_server%2C+original_format%2C+last_update%2C+geo%2C+tags%2C+machine_tags%2C+o_dims%2C+views%2C+media%2C+path_alias%2C+url_sq%2C+url_l"
const apiLink= `${endpoint}?method=${method}&api_key=${api_key}&photoset_id=${photoset_id}&user_id=${user_id}&extras=${extras}&${format}`

const albumname = document.querySelector('.albumname')
const owner = document.querySelector('.owner')
const amount = document.querySelector('.amount')
const album = document.querySelector('.album')


fetch(apiLink)
  .then(res => res.json())
  .then(data => renderPhotos(data))

function renderPhotos(data) {
  const photoset = Object.values(data)[0]
  // console.log(photoset.photo[0])

  albumname.innerHTML+= photoset.title
  amount.innerHTML+= photoset.total + ' photos'
  owner.innerHTML+= 'by ' + `<em>${photoset.ownername}</em>`


  return photoset.photo.map(data => {
    // console.log(data.height_l)
        album.innerHTML+=
        `
        <article>
        <figure>
            <img src="${data.url_l}" alt="${data.title}">
            <figcaption>${data.title}</figcaption>
        </figure>
        <p>hier komt een bijschrift</p>
        <ul>
         <li>${data.tags}</li>
        </ul>
        </article>`
    })
 }

 function hangSlingersOp() {
   var slingers = document.querySelector(".slingers");
   if (slingers.style.display === "none") {
     slingers.style.display = "block";
   } else {
     slingers.style.display = "none";
   }
 }
