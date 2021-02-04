const mongoose = require('mongoose')
const propertiesSchema = require('./properties.schema')
const propertiesModel = mongoose.model(
    'PropertiesModel',
    propertiesSchema
)
module.exports = propertiesModel
