const mongoose = require('mongoose')
const usersSchema = mongoose.Schema(
    {
        userId: String,
        name: String,
        firstName: String,
        lastName: String,
        email: String,
        profilePic: String,
        phone: String,
        dob: Date,
        role: String,
        addrLine1: String,
        addrLine2: String,
        city: String,
        state: String,
        zipcode: String
    }, {collection: 'users'}
)

module.exports = usersSchema

