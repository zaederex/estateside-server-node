const mongoose = require('mongoose')

const propertiesSchema = mongoose.Schema({
                                             zpid: Number,
                                             // address: String,
                                             address: {
                                                 full: String,
                                                 city: String,
                                                 state: String,
                                                 house: String,
                                                 street: String,
                                                 zip: String,
                                                 zip4: String
                                             },
                                             coordinates: [String, String],
                                             date: Date,
                                             zestimate: Number,
                                             rental: {zestimate: Number},
                                             upper: Number,
                                             lower: Number,
                                             zillowUrl: String,
                                             url: String,
                                             ownerName: [String],

                                             // to be revisited
                                             userId: Number,
                                             ownerUsers: [String],
                                             interestedTenantUsers: [{
                                                 type: mongoose.Schema.Types.ObjectId,
                                                 ref: 'userModel'
                                             }],
                                         }, {collection: 'properties'})
module.exports = propertiesSchema
