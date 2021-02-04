const mongoose = require('mongoose');

const contactsSchema = mongoose.Schema(
    {
        message: String,
        name: String,
        email: String,
    }, {collection: 'contactRequests'}
);

module.exports = contactsSchema;

