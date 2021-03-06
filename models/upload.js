const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const uploadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
      
    },
    url: {
        type: String,
        require: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    uploadedBy: {
        type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    likes: [{type: ObjectId, ref: "User"}],
    comments: [
        {
            text: String,
            created: {
                type: Date,
                default: Date.now
            },
            uploadedBy: {
                type: ObjectId,
                ref: 'User'
            }
        }
    ]
})

module.exports = mongoose.model("Upload", uploadSchema);