import { User, Post } from '../data/index.js'
import { ContentError, MatchError, SystemError, } from 'com/errors.js'
import validate from 'com/validate.js'


const toggleLikePost = (userId, postId, callback) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.callback(callback)

    User.findById(userId).lean()
        .then(user => {
            if (!user) {
                callback(new ContentError('User not found'))

                return
            }

            Post.findById(postId)
                .then(post => {
                    if (!post) {
                        callback(new MatchError('post not found'))

                        return
                    }

                    const included = post.likes.some(userObjectId => userObjectId.toString() === userId)

                    Post.updateOne({ _id: post._id },
                        included ?
                            { $pull: { likes: user._id } }
                            :
                            { $push: { likes: user._id } }
                    )
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default toggleLikePost