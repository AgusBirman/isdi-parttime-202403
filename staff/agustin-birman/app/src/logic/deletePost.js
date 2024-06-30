import validate from '../../../com/validate'
import errors from 'com/errors'

const deletePost = (postId, callback) => {
    validate.id(postId, 'postId')
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 204) {
            callback(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.open('DELETE', `${import.meta.env.VITE_API_URL}/posts/${postId}`)

    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
    xhr.send()
}

export default deletePost