import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types


const post = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }]
    // ,
    //     comments: [{
    //         author: String,
    //         text: String,
    //         date: Date,
    //         likes: [{
    //             type: String
    //         }],
    //         default: Date.now
    //     }]
})

const Post = model('Post', post)

export default Post
