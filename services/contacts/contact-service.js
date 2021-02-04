const contactsDao = require('../../daos/contacts/contacts.dao');

const addContactRequest = (contactRequest) => contactsDao.addContactRequest(contactRequest);

module.exports = {addContactRequest};
