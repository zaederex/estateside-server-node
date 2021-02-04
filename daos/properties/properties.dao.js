const propertiesModel = require('../../models/properties/properties.model')

const findTotalPropertiesCountForLocation = (location) => propertiesModel.countDocuments(
    {"address.city": location});

const findTotalPropertiesCountForUser = (userId) => propertiesModel.countDocuments(
    {"userId": userId});

const findTotalPropertiesCountForZpid = (zpid) => propertiesModel.countDocuments({"zpid": zpid});

const findPropertyById = (pid) => propertiesModel.findOne({id: pid});

const findPropertiesForUser = (userId) =>  //needs correction
    propertiesModel.find({userId: userId})

const createProperty = (property) => propertiesModel.create(property)

const updateProperty = (zpid, newProperty) => propertiesModel.update({"zpid": zpid},
                                                                     {$set: newProperty})

const deleteProperty = (zpid) => propertiesModel.deleteOne({"zpid": zpid})

const findAllRegisteredProperties = () => propertiesModel.find()

const findPropertiesByLocation = (location) => propertiesModel.find({"address.city": location});

const findRegisteredPropertyById = (zpid) => propertiesModel.findOne({"zpid": zpid})

const skipAndFindProperties = (location, offset) => propertiesModel.find(
    {"address.city": location}).skip(offset).limit(12);

module.exports = {
    findPropertiesForUser,
    createProperty,
    updateProperty,
    deleteProperty,
    findAllRegisteredProperties,
    findPropertyById,
    findRegisteredPropertyById,
    findTotalPropertiesCount: findTotalPropertiesCountForLocation,
    findPropertiesByLocation,
    skipAndFindProperties,
    findTotalPropertiesCountForUser,
    findTotalPropertiesCountForZpid
}
