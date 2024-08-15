const mongoose = require('mongoose');

const PlaylistSchema = new Schema({
    name: {type: String, required:true},
    tracks: [{type: Schema.Types.ObjectId, ref: 'Track'}],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
     
});

module.exports = mongoose.model('Playlist', PlaylistSchema);