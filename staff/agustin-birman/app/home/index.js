// if (!logic.isUserLoggedIn())
//     location.href = '../login'

const view = new Component(document.body)
view.addClass('View')

const header = new Component('header')
header.addClass('Header')
view.add(header)

const userName = userLogic.getUserName()

const usernameTitle = new Heading(3)
usernameTitle.setText(userName)
header.add(usernameTitle)

const logoutButton = new Button('Logout')

logoutButton.onClick(() => {
    userLogic.logoutUser()

    location.href = '../login'
})

header.add(logoutButton)

const main = new Component('main')
view.add(main)

const postList = new PostList
main.add(postList)

<<<<<<< HEAD
=======
const posts = logic.getAllPosts()

posts.forEach(post => {
    const newPost = new Post(post)

    postList.add(newPost)
})

>>>>>>> a2fc28ce2924d11bb35aa943bc05a27afe6f6ead
const footer = new Component('footer')
footer.addClass('Footer')
view.add(footer)

const addPostButton = new Button
addPostButton.setText("+")
footer.add(addPostButton)

const scrollTop = new Component('i')
scrollTop.addClass('fa-solid')
scrollTop.addClass('fa-arrow-up-long')
footer.add(scrollTop)
<<<<<<< HEAD

scrollTop.onClick(() => {
    const scrollDuration = 2000
    const scrollStep = -window.scrollY / (scrollDuration / 15)
    const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep)
        } else {
            clearInterval(scrollInterval)
        }
    })
})

const divCreatePost = new Component('div')
divCreatePost.addClass('divCreatePost')

const createPostForm = new CreatePostForm()

addPostButton.onClick(() => {
    divCreatePost.add(createPostForm)
    view.add(divCreatePost)

    createPostForm.onCreatePostSubmit((title, image, description) => {

        try {
            postLogic.createPost(title, image, description)

            createPostForm.clear()

            view.remove(divCreatePost)

            postList.load()

        } catch (error) {
            if (error instanceof ContentError)
                createPostForm.setFeedback(error.message + ', please, correct it')
            else
                createPostForm.setFeedback('Sorry, there was an error, try later again')
        }
    })
})
=======

scrollTop.onClick(() => {
    const scrollDuration = 2000
    const scrollStep = -window.scrollY / (scrollDuration / 15)
    const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep)
        } else {
            clearInterval(scrollInterval)
        }
    })
})

const divCreatePost = new Component('div')
let windowPost = true
divCreatePost.addClass('divCreatePost')
const createPostForm = new CreatePostForm()

addPostButton.onClick(() => {
    // esto sirve para crear el formulario para crear un post
    windowPost = !windowPost
    if (!windowPost) {
        createPostForm.onSubmit(event => {
            event.preventDefault()

            const title = createPostForm.getTitle()
            const image = createPostForm.getImage()
            const description = createPostForm.getDescription()

            try {
                logic.createPost(title, image, description)

                createPostForm.clear()

                location.reload()

            } catch (error) {
                if (error instanceof ContentError)
                    createPostForm.setFeedback('error.mesasge' + ', please, correct it')
                else
                    createPostForm.setFeedback('Sorry, there was an error, try later again')
            }
        })

        divCreatePost.add(createPostForm)
        view.add(divCreatePost)

    } else if (windowPost) {
        view.remove(divCreatePost)
    }

})

// css
// https://miro.medium.com/v2/resize:fit:471/1*uKYwbfGFzTwXr-1g7FYYow.png
// java
// https://web-assets.esetstatic.com/wls/2022/06/6.jpg
// HTMLAllCollection
// https://image.slidesharecdn.com/cdigohtmltrabajocompu-140108182640-phpapp02/85/cdigo-html-trabajo-compu-4-320.jpg
>>>>>>> a2fc28ce2924d11bb35aa943bc05a27afe6f6ead
