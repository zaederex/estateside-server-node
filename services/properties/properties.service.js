const propertiesDao = require('../../daos/properties/properties.dao')

const findTotalPropertiesCount = (location) => propertiesDao.findTotalPropertiesCount(location);

const findTotalPropertiesCountForUser = (userId) => propertiesDao.findTotalPropertiesCountForUser(
    userId);

const findTotalPropertiesCountForZpid = (zpid) => propertiesDao.findTotalPropertiesCountForZpid(
    zpid);

const findAllRegisteredProperties = (location, offset) => {
    if (location) {
        return propertiesDao.skipAndFindProperties(location, offset);
    }
    return propertiesDao.findAllRegisteredProperties();
};

const findAllRegisteredMongoProperties = () => propertiesDao.findAllRegisteredProperties()

const findPropertyById = (pid) =>
    propertiesDao.findPropertyById(pid)

const findPropertiesForUser = (userId) =>
    propertiesDao.findPropertiesForUser(userId)

const createProperty = (property) => propertiesDao.createProperty(property)

const updateProperty = (zpid, newProperty) => propertiesDao.updateProperty(zpid, newProperty)

const deleteProperty = (zpid) => propertiesDao.deleteProperty(zpid)

const findRegisteredPropertyById = (zpid) =>
    propertiesDao.findRegisteredPropertyById(zpid)

module.exports = {
    findPropertiesForUser,
    createProperty,
    updateProperty,
    deleteProperty,
    findAllRegisteredProperties,
    findPropertyById,
    findRegisteredPropertyById,
    findTotalPropertiesCount,
    findTotalPropertiesCountForUser,
    findAllRegisteredMongoProperties,
    findTotalPropertiesCountForZpid
};
