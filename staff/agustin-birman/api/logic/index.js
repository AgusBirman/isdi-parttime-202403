import data from '../data/index.js'
import { ContentError, SystemError, MatchError, DuplicityError } from '../errors.js'

const logic = {}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{8,}$/
const ID_REGEX = /^[0-9]+-[0-9]+$/
const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/

logic.registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
    if (!NAME_REGEX.test(name))
        throw new ContentError('name is not valid')

    if (!NAME_REGEX.test(surname))
        throw new ContentError('surname is not valid')

    if (!EMAIL_REGEX.test(email))
        throw new ContentError('email is not valid')

    if (!USERNAME_REGEX.test(username))
        throw new ContentError('username is not valid')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('password is not valid')

    if (password !== passwordRepeat)
        throw new MatchError('passwords don\'t match')

    if (typeof callback !== 'function')
        throw new TypeError('callback is not a function')

    data.findUser(user => user.email === email || user.username === username, (error, user) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }

        if (user) {
            callback(new DuplicityError('user already exists'))

            return
        }

        const newUser = {
            name,
            surname,
            email,
            username,
            password
        }

        data.insertUser(newUser, error => {
            if (error) {
                callback(new SystemError(error.message))

                return
            }

            callback(null, newUser)
        })
    })
}

logic.authenticateUser = (username, password, callback) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError('username is not valid')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('password is not valid')

    if (typeof callback !== 'function')
        throw new TypeError('callback is not a function')

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new MatchError('user not found'))

            return
        }

        if (user.password !== password) {
            callback(new MatchError('wrong password'))

            return
        }

        callback(null)
    })
}

logic.getUserName = (username, targetUsername, callback) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError('username is not valid')

    if (!USERNAME_REGEX.test(targetUsername))
        throw new ContentError('targetUsername is not valid')

    if (typeof callback !== 'function')
        throw new TypeError('callback is not a function')

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new MatchError('user not found'))

            return
        }

        data.findUser(user => user.username === targetUsername, (error, targetUser) => {
            if (error) {
                callback(error)

                return
            }

            if (!targetUser) {
                callback(new MatchError('targetUser not found'))

                return
            }

            callback(null, targetUser.name)
        })
    })
}

logic.getAllposts = callback => {
    data.findPosts(() => true, (error, posts) => {
        if (error) {
            callback(error)

            return
        }

        callback(null, posts.reverse())
    })
}

logic.createPost = (username, title, image, description, callback) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError('username is not valid')

    if (typeof title !== 'string' || !title.length || title.length > 50)
        throw new ContentError('title is not valid')

    if (typeof image !== 'string' || !image.startsWith('http'))
        throw new ContentError('image is not valid')

    if (typeof description !== 'string' || !description.length || description.length > 200)
        throw new ContentError('description is not valid')

    if (typeof callback !== 'function')
        throw new TypeError('callback is not a function')

    //No entendi la razon de esta parde del codigo, ya que el usuario ya existe, pero manu lo hizo asi para comprobar el usuario
    data.findUser(user => user.username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new MatchError('user not found'))

            return
        }

        const newPost = {
            author: username,
            title,
            image,
            description,
            date: getFullDateString()
        }

        data.insertPost(newPost, error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}

logic.deletePost = (username, postId, callback) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError('username is not valid')

    if (!ID_REGEX.test(postId))
        throw new ContentError('postId is not valid')

    if (typeof callback !== 'function')
        throw new TypeError('callback is not a function')

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new ContentError('User not found'))

            return
        }

        data.findPost(post => post.id === postId, (error, post) => {
            if (error) {
                callback(error)

                return
            }

            if (!post) {
                callback(new MatchError('post not found'))

                return
            }

            if (post.author !== username) {
                callback(new MatchError('post author does not match user'))

                return
            }

            data.deletePost(post => post.id === postId, error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)
            })
        })
    })
}

const getFullDateString = () => {
    const fullDate = new Date()
    const day = fullDate.getDate().toString().padStart(2, '0');
    const month = (fullDate.getMonth() + 1).toString().padStart(2, '0');
    const year = fullDate.getFullYear().toString();
    const hour = fullDate.getHours().toString().padStart(2, '0');
    const minute = fullDate.getMinutes().toString().padStart(2, '0');

    const date = `${day}/${month}/${year} ${hour}:${minute}`;

    return date
}

export default logic