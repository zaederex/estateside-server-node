const mongoose = require('mongoose');

const appointmentsSchema = mongoose.Schema(
    {
        userId: String,
        zpid: String,
        appointmentDate: Date,
        message: String
    }, {collection: 'appointments'}
);

module.exports = appointmentsSchema;
