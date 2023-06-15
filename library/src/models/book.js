const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        default: "",
    },
    authors: {
        type: String,
        require: true
    },
    favorite: {
        type: Boolean,
        default: false
    },
    fileCover: {
        type: String,
        default: ""
    },
    fileName: {
        type: String,
        default: ""
    }
})

module.exports = model('Book', bookSchema);
