class Post extends Component {
    constructor(post) {
        super('article')
        this.addClass('Article')


<<<<<<< HEAD
        this.addClass('Article')
=======
>>>>>>> a2fc28ce2924d11bb35aa943bc05a27afe6f6ead

        const postTitle = new Component('h2')
        postTitle.setText(post.title)
        postTitle.addClass('Title')

        const postImage = new Image
        postImage.setUrl(post.image)
        postImage.addClass('Image')

        const postDescription = new Component('p')
        postDescription.setText(post.description)
        postDescription.addClass('Description')

        const postAuthor = new Component('p')
        postAuthor.setText(post.author)
        postAuthor.addClass('Author')

        const postDate = new Component('time')
        postDate.setText(post.date)
        postDate.addClass('Date')


        this.add(postTitle)
        this.add(postImage)
        this.add(postDescription)
        this.add(postDate)
        this.add(postAuthor)
<<<<<<< HEAD

        if (post.author === sessionStorage.username) {
            const navButton = new Component('i')
            navButton.addClass('fa-solid')
            navButton.addClass('fa-bars')
            this.add(navButton)

            let navWindow = true

            const deleteButton = new Button('Delete')
            deleteButton.setType('button')
            deleteButton.addClass('DeleteButton')

            deleteButton.onClick(() => {
                postLogic.deletePost(post.id)

                this.onPostDeletedListener()
            })

            const editButton = new Button('Edit')
            editButton.setType('button')
            editButton.addClass('EditButton')

            navButton.onClick(() => {
                navWindow = !navWindow

                if (!navWindow) {
                    navButton.add(deleteButton)
                    navButton.add(editButton)
                } else {
                    navButton.remove(deleteButton)
                    navButton.remove(editButton)
                }
            })
        }
    }
    onPostDeleted(listener) {
        this.onPostDeletedListener = listener
=======
>>>>>>> a2fc28ce2924d11bb35aa943bc05a27afe6f6ead
    }
}