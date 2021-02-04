const contactsModel = require('../../models/contacts/contacts.model');

const addContactRequest = (contactRequest) => contactsModel.create(contactRequest);

module.exports = {addContactRequest}
