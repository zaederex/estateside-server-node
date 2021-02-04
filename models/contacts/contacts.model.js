const mongoose = require('mongoose')
const contactSchema = require('./contacts.schema')
const contactModel = mongoose.model(
    'ContactModel',
    contactSchema
);

module.exports = contactModel
