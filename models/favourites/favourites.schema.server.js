const mongoose = require('mongoose');

const favouritesSchema = mongoose.Schema(
    {
        // userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
        // zpid: {type: mongoose.Schema.Types.ObjectId, ref: 'properties'},
        userId: {
            type: String,
            required: true,
            unique: false
        },
        zpid: {
            type: String,
            required: true,
            unique: false
        },
    }, {collection: 'favourites'}
);

module.exports = favouritesSchema;
