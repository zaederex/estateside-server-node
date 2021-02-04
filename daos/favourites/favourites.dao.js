const favouritesModel = require('../../models/favourites/favourites.model.server')

const findFavouritePropertiesForUser = (userId) =>
    favouritesModel.find({userId: userId})

const findCountUsersLikingTheProperty = (zpid) =>
    favouritesModel.countDocuments({"zpid": zpid})

const createFavouriteProperty = (favouriteMapping) => favouritesModel.create(favouriteMapping)

const undoFavouriteProperty = (userId, zpid) => favouritesModel.deleteOne(
    {"userId": userId, "zpid": zpid})

const isFavouriteForUser = (userId, zpid) => favouritesModel.countDocuments({"userId": userId, "zpid": zpid})

module.exports = {
    findFavouritePropertiesForUser,
    findCountUsersLikingTheProperty,
    createFavouriteProperty,
    undoFavouriteProperty,
    isFavouriteForUser
}
