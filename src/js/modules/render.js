const renderData = {
  timeline: function (data) {
    console.log(data)
    const photoTimeline1 = document.getElementById("photoTimeline1")
    const photoTimeline2 = document.getElementById("photoTimeline2")
    const photoTimeline3 = document.getElementById("photoTimeline3")
    const photoTimeline4 = document.getElementById("photoTimeline4")
    const photoTimeline5 = document.getElementById("photoTimeline5")
    const photoTimeline6 = document.getElementById("photoTimeline6")
    const photoTimeline7 = document.getElementById("photoTimeline7")
    const photoTimeline8 = document.getElementById("photoTimeline8")


    const headerInfo = document.getElementById("headerInfo")
    const day1info = document.querySelector(".day1amount")
    const day2info = document.querySelector(".day2amount")
    const day3info = document.querySelector(".day3amount")
    const day4info = document.querySelector(".day4amount")
    const day5info = document.querySelector(".day5amount")
    const day6info = document.querySelector(".day6amount")
    const day7info = document.querySelector(".day7amount")
    const day8info = document.querySelector(".day8amount")


    const headerContent = {
      albumName: data.albumname,
      albumOwner: data.owner,
      amount: data.amount + ' photos'
    }


    const photoList = data.photos.map(photo => {
      // console.log(photo.tags)
      return {
        url: photo.url_small,
        title: photo.title,
        // tags: photo.tags.forEach(tag => {
        //   return tag
        // })
        tags:  photo.tags
      
      }
    })


    // let dingen = data.photos.map(photo => {
    //   console.log(photo.tags)
    // })
    // console.log(photoList[0].tags)

    const directives = {
      url: {
        src: function () {
          return this.url
        },
        href: function () {
          return this.url
        }
      }
    }

    const photoList1 = photoList.slice(0, 9)
    const photoList2 = photoList.slice(9, 21)
    const photoList3 = photoList.slice(21, 46)
    const photoList4 = photoList.slice(46, 69)
    const photoList5 = photoList.slice(69, 84)
    const photoList6 = photoList.slice(84, 96)
    const photoList7 = photoList.slice(96, 113)
    const photoList8 = photoList.slice(113, 137)

    

    // console.log(photoList1.length)
    day1info.innerHTML = photoList1.length + ' photos'
    day2info.innerHTML = photoList2.length + ' photos'
    day3info.innerHTML = photoList3.length + ' photos'
    day4info.innerHTML = photoList4.length + ' photos'
    day5info.innerHTML = photoList5.length + ' photos'
    day6info.innerHTML = photoList6.length + ' photos'
    day7info.innerHTML = photoList7.length + ' photos'
    day8info.innerHTML = photoList8.length + ' photos'

    

    const daysNav = document.querySelector('.timelineNav')
    daysNav.classList.remove('placeholder')

    Transparency.render(headerInfo, headerContent)
    Transparency.render(photoTimeline1, photoList1, directives)
    Transparency.render(photoTimeline2, photoList2, directives)
    Transparency.render(photoTimeline3, photoList3, directives)
    Transparency.render(photoTimeline4, photoList4, directives)
    Transparency.render(photoTimeline5, photoList5, directives)
    Transparency.render(photoTimeline6, photoList6, directives)
    Transparency.render(photoTimeline7, photoList7, directives)
    Transparency.render(photoTimeline8, photoList8, directives)


    // Transparency.render(root, avatarIMG, directives)
  },
  notities: function () {
    const notes = JSON.parse(localStorage.getItem("notitions"))
    // console.log(notes)

    const savedNotitions = document.querySelector(".saved-notitions")
    const sortbuttons = document.querySelector(".sortbuttons")
    const blankState = document.querySelector(".blank")

    savedNotitions.classList.remove('placeholder')
    sortbuttons.classList.remove('placeholder')
    blankState.classList.add('placeholder')


    const notities = notes.map(data => ({
      close: 'x',
      noteDate: data.date,
      noteText: data.note
    }))

    Transparency.render(savedNotitions, notities)

    addCloseButtons()
    // },
    // detail: function(id) {
    //   const pictureDetail = document.getElementById("onephoto")
    //   const onephoto = id.map(photo => ({
    //     projectName: photo.name,
    //     description: 'Description: ' + photo.description,
    //     avatar: photo.avatar,
    //     html_url: photo.html_url,
    //     homepage: 'Link to pictureDetail: ' + photo.homepage,
    //     id: 'Github ID: ' + photo.id,
    //     name: 'Name: ' + photo.name,
    //     full_name: 'Full name: ' + photo.full_name,
    //     private: 'Private repo?: ' + photo.private,
    //     milestones_url: photo.milestones_url,
    //     notifications_url: photo.notifications_url,
    //     labels_url: photo.labels_url,
    //     releases_url: photo.releases_url,
    //     deployments_url: photo.deployments_url,
    //     created_at: photo.created_at,
    //     updated_at: photo.updated_at,
    //     pushed_at: photo.pushed_at,
    //     git_url: photo.git_url,
    //     ssh_url: photo.ssh_url,
    //     clone_url: photo.clone_url,
    //     svn_url: photo.svn_url,
    //     homepage: photo.homepage,
    //     size: photo.size,
    //     stargazers_count: photo.stargazers_count,
    //     watchers_count: photo.watchers_count,
    //     language: photo.language,
    //     has_issues: photo.has_issues,
    //     has_projects: photo.has_projects,
    //     has_downloads: photo.has_downloads,
    //     has_wiki: photo.has_wiki,
    //     has_pages: photo.has_pages,
    //     forks_count: photo.forks_count,
    //     mirror_url: photo.mirror_url,
    //     archived: photo.archived,
    //     disabled: photo.disabled,
    //     open_issues_count: photo.open_issues_count
    //   }))

    //   const directives = {
    //     avatar: {
    //       src: function() {
    //         return this.avatar
    //       }
    //     },
    //     html_url: {
    //       href: function() {
    //         return this.html_url
    //       }
    //     }
    //   }

    //   Transparency.render(pictureDetail, onephoto, directives)
  },
  notitiesSort: function (sortedNotes) {
    const savedNotitions = document.querySelector(".saved-notitions")
    // savedNotitions.classList.remove('placeholder')

    const notities = sortedNotes.map(data => ({
      close: 'x',
      noteDate: data.date,
      noteText: data.note
    }))

    Transparency.render(savedNotitions, notities)

    addCloseButtons()
  },
  pinterestboards: function () {
    const boardurls = JSON.parse(localStorage.getItem("pinterestUrls"))
    // console.log(boardurls)

    const noPinterestWarning = document.querySelector(".noPinterest")
    const pinterestboards = document.querySelector(".pinterestboards")
    pinterestboards.classList.remove('placeholder')
    noPinterestWarning.classList.add('placeholder')

    // const pinterestBoardURLS = boardurls.map(data => ({
    //   close: 'x',
    //   noteDate: data.date,
    //   noteText: data.note
    // }))


    const boardContent = boardurls.map(data => ({
      pinterestBoard: data
    }))

    const directives = {
      pinterestBoard: {
        href: function () {
          return this.pinterestBoard
        }
      }
    }

    // console.log(boardContent)
    // console.log(directives)

    Transparency.render(pinterestboards, boardContent, directives)
    // location.reload();


  }
}

function addCloseButtons() {
  let stickies = document.getElementsByClassName("sticky")
  let xs = document.getElementsByClassName("close")

  for (let i = 0; i < stickies.length; i++) {
    xs[i].addEventListener("click", () => {
      // console.log(stickies.length)
      stickies[i].style.display = "none"

      let note = stickies[i]
      // console.log(note)
      const currentNoteDate = note.querySelector(".noteDate").innerHTML
      const currentNoteText = note.querySelector(".noteText").innerHTML



      let noteData = {
        date: currentNoteDate,
        note: currentNoteText
      }

      const notes = JSON.parse(localStorage.getItem("notitions"))

      // console.log(noteData)
      // console.log(notes)


      const index = notes.findIndex(x => x.date == noteData.date && x.note === noteData.note);
      // console.log(index)

      if (index > -1) {
        notes.splice(index, 1);
        console.log("removed note, update to localStorage")
        localStorage.setItem("notitions", JSON.stringify(notes))
        const newnotes = JSON.parse(localStorage.getItem("notitions"))
        // console.log(newnotes)
      }

      // array = [2, 9]
      // console.log(notes);
      // const found = notes.find(element => element > 10);



      // router.noData()
    })
  }
}

export {
  renderData
}