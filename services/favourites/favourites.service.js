const favouritesDao = require('../../daos/favourites/favourites.dao')

const findFavouritePropertiesForUser = (userId) =>
    favouritesDao.findFavouritePropertiesForUser(userId)

const findCountUsersLikingTheProperty = (zpid) =>
    favouritesDao.findCountUsersLikingTheProperty(zpid)

const createFavouriteProperty = (favouriteMapping) => favouritesDao.createFavouriteProperty(favouriteMapping)

const undoFavouriteProperty = (userId, zpid) => favouritesDao.undoFavouriteProperty(userId, zpid)

const isFavouriteForUser = (userId, zpid) => favouritesDao.isFavouriteForUser(userId, zpid)

module.exports = {
    findFavouritePropertiesForUser,
    findCountUsersLikingTheProperty,
    createFavouriteProperty,
    undoFavouriteProperty,
    isFavouriteForUser
};
