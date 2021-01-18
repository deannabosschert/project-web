const renderPhotos = {
  timeline: function (data) {
    console.log(data)
    const photoTimeline = document.getElementById("photoTimeline")
    const headerInfo = document.getElementById("headerInfo")

    const headerContent = {
      albumName: data.albumname,
      albumOwner: data.owner,
      amount: data.amount + ' photos'
    }

    // const photoList = data.photos.map(photo => ({
    //     url: photo.url_l,
    //     title: photo.title,
    //     tags: photo.tags
    //   }))
    // }

    const photoList = data.photos.map(photo => {
      return {
        url: photo.url_small,
        title: photo.title,
        tags: photo.tags
      }
    })


    console.log(photoList)

    // const photoAvatars = JSON.parse(storage.getItem("githubAvatars"))
    // const avatarIMG = photoAvatars.map(photoAvatar => ({
    //   avatar: photoAvatar.transparency.model.avatar
    // }))

    const directives = {
      url: {
        src: function () {
          return this.url
        },
        href: function () {
          return this.url
        }
      },
      // linkTopictureDetail: {
      //   href: function() {
      //     return "#/" + this.id
      //   }
      // },
      // html_url: {
      //   href: function() {
      //     return this.html_url
      //   }
      // },
      // id: {
      //   href: function() {
      //     return this.id
      //   }
      // }
    }
    Transparency.render(headerInfo, headerContent)
    Transparency.render(photoTimeline, photoList, directives)
    // Transparency.render(root, avatarIMG, directives)
  },
  notities: function (photos) {
    const notities = document.getElementById("/src/#notities")
    console.log(notities)
    const photoList = photos.map(photo => ({
      projectName: 'Paginatwee' + photo.name,
      description: 'Description: ' + photo.description,
      homepage: 'Link to pictureDetail: ' + photo.homepage,
      id: photo.id,
      name: 'Name: ' + photo.name,
      full_name: 'Full name: ' + photo.full_name,
      private: 'Private repo?: ' + photo.private
    }))

    Transparency.render(notities, photoList)
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
  }
}


export {
  renderPhotos
}