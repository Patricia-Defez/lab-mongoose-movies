const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    plot: {
        type: String
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', schema);