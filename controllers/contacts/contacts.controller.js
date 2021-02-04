const contactsService = require('../../services/contacts/contact-service')

module.exports = (app) => {
    const addContactRequest = (req, res) => {
        contactsService.addContactRequest(req.body)
            .then(createdContactRequest => res.json(createdContactRequest));
    }
    app.post('/api/contacts', addContactRequest);
}
