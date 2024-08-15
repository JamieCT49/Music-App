const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    song_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: false
    },
    artist: {
        type: String,
        required: false
    },
    album: {
        type: String,
        required: false
    },
    duration: {
        type: Number,
        required: false
    },
    preview_url: {
        type: String,
        required: false,
        unique: true
    },
    image_url: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
});

const Song = model('Song', songSchema);

module.exports = Song;