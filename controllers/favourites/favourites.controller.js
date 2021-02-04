const favouritesService = require('../../services/favourites/favourites.service')
const propertiesService = require('../../services/properties/properties.service')
const propertiesApi = require('../../api/properties-api')

const propertyUrl = "/api/properties";
const userUrl = "/api/users";

module.exports = (app) => {

    const createFavouriteProperty = (req, res) => {
        favouritesService.createFavouriteProperty(req.body)
            .then(fav => res.json(fav));
    };

    const findCountUsersLikingTheProperty = (req, res) => {
        const zpid = req.params['zpid'];
        favouritesService.findCountUsersLikingTheProperty(zpid)
            .then(count => {
                res.json({"count": count})
            })
    };

    const findFavouritePropertiesForUser = (req, res) => {
        const userId = req.params['userId'];
        favouritesService.findFavouritePropertiesForUser(userId)
            .then(response => {
                const allFavProperties = [];
                for (let mapping of response) {
                    allFavProperties.push(
                        propertiesService.findRegisteredPropertyById(mapping.zpid));
                    allFavProperties.push(
                        propertiesApi.getSpecificExternalProperty(mapping.zpid))
                }
                return Promise.all(allFavProperties);
            })
            .then((allFavs) => {
                const favorites = [];
                for (let i = 0; i < allFavs.length; i++) {
                    if (allFavs[i] === null) {
                        continue;
                    }
                    if (allFavs[i].data) {
                        if (allFavs[i].data.total === 1) {
                            favorites.push(allFavs[i].data.bundle[0]);
                        }
                    } else {
                        favorites.push(allFavs[i]);
                    }
                }
                res.json(favorites);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const undoFavouriteProperty = (req, res) => {
        const userId = req.params['userId'];
        const zpid = req.params['zpid'];
        favouritesService.undoFavouriteProperty(userId, zpid)
            .then(status => res.send(status))
    };

    const isFavouriteForUser = (req, res) => {
        const userId = req.params['userId'];
        const zpid = req.params['zpid'];
        favouritesService.isFavouriteForUser(userId, zpid)
            .then(count => {
                if (count === 0) {
                    res.json({"isFav": false})
                } else {
                    res.json({"isFav": true})
                }
            })
    };

    app.get(`${propertyUrl}/:zpid/favourites`, findCountUsersLikingTheProperty);
    app.get(`${userUrl}/:userId/favourites`, findFavouritePropertiesForUser);
    app.post(`${propertyUrl}/addFav`, createFavouriteProperty);
    app.delete(`${propertyUrl}/:zpid/favourites/:userId`, undoFavouriteProperty);
    app.get(`${propertyUrl}/:zpid/favourites/:userId`, isFavouriteForUser);
};
