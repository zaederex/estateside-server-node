const propertiesApi = require('../../api/properties-api')
const propertiesService = require('../../services/properties/properties.service')
const propertyUrl = "/api/properties";
const userUrl = "/api/users";

module.exports = (app) => {
    const findProperties = (req, res) => {
        const location = req.query.location;
        let offset = req.query.offset;
        if (!offset) {
            offset = 0;
        } else {
            offset = parseInt(offset);
        }
        propertiesService.findTotalPropertiesCount(location).then(registeredCount => {
            if (offset < registeredCount) {
                propertiesService.findAllRegisteredProperties(location, offset)
                    .then(registeredProperties => {
                        for (let i = 0; i < registeredProperties.length; i++) {
                            registeredProperties[i]._doc.address =
                                registeredProperties[i]._doc.address.full;
                        }
                        const noOfPropertiesToFetch = 12 - registeredProperties.length;
                        if (noOfPropertiesToFetch > 0) {
                            const skip = (offset - registeredProperties.length > 0) ? offset
                                                                                      - registeredProperties.length
                                                                                    : 0;
                            propertiesApi.getAllProperties(location, skip, noOfPropertiesToFetch)
                                .then(apiProperties => {
                                    apiProperties.total =
                                        registeredCount + apiProperties.data.total;
                                    apiProperties.data.bundle.push(...registeredProperties);
                                    res.json({
                                                 "bundle": apiProperties.data.bundle,
                                                 "total": (apiProperties.total) < 10012
                                                          ? apiProperties.total : 10012
                                             });
                                });
                        } else {
                            propertiesApi.getAllProperties(location, 0, 1) // do not change this
                                .then(allProperties => {
                                    const apiTotal = allProperties.data.total;
                                    res.json({
                                                 "bundle": registeredProperties,
                                                 "total": (registeredCount + apiTotal) < 10012
                                                          ? (registeredCount + apiTotal) : 10012
                                             });
                                });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                propertiesApi.getAllProperties(location, offset - registeredCount, 12)
                    .then(allProperties => {
                        allProperties.data.total += registeredCount;
                        res.json({
                                     "bundle": allProperties.data.bundle,
                                     "total": allProperties.data.total < 10012
                                              ? (allProperties.data.total) : 10012
                                 });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        })
    };

    const findPropertiesById = (req, res) => {
        const zpid = req.params['zpid'];
        propertiesService.findRegisteredPropertyById(zpid)
            .then(property => {
                if (property === null || property === undefined || property === '') {
                    propertiesApi.getPropertyById(zpid, res)
                } else {
                    res.json(property)
                }
            })
    };

    const getSpecificExternalProperty = (req, res) => {
        const zpid = req.params['zpid'];

        propertiesService.findRegisteredPropertyById(zpid)
            .then(property => {
                if (property === null || property === undefined || property === '') {
                    propertiesApi.getSpecificExternalProperty(zpid, res)
                } else {
                    res.json(property)
                }
            })
    };

    const findRegisteredPropertyById = (req, res) => {
        const zpid = req.params['zpid'];
        propertiesService.findRegisteredPropertyById(zpid)
            .then(property => {
                if (property === null) {
                    res.json({})
                } else {
                    res.json(property)
                }
            })
    };

    const findAllRegisteredProperties = (req, res) => {
        propertiesService.findAllRegisteredMongoProperties()
            .then(property => {
                res.json(property)
            })
    };

    const findPropertiesForUser = (req, res) => {
        const userId = req.params['userId'];
        propertiesService.findTotalPropertiesCountForUser(userId)
            .then(count => propertiesService.findPropertiesForUser(userId)
                .then(properties => {
                    for (let i = 0; i < properties.length; i++) {
                        properties[i]._doc.address =
                            properties[i]._doc.address.full;
                    }
                    res.json({
                                 bundle: properties,
                                 total: count
                             })
                }))

    };

    const createProperties = (req, res) => {
        propertiesService.createProperty(req.body)
            .then(actualProperty => {
                      res.json({
                                   ...actualProperty._doc,
                               })
                  }
            )
    };

    const deleteProperties = (req, res) => {
        const zpid = req.params['zpid']
        propertiesService.deleteProperty(zpid)
            .then(status => res.json(status))
    };

    const updateProperties = (req, res) => {
        const zpid = req.params['zpid']
        const newProperty = req.body
        propertiesService.updateProperty(zpid, newProperty)
            .then(status => res.json(status))
    };

    app.get(propertyUrl, findProperties)
    app.get(`${propertyUrl}/:zpid`, findPropertiesById)
    app.get(`${propertyUrl}/registered/all/properties`, findAllRegisteredProperties)
    app.get(`${propertyUrl}/registered/:zpid`, findRegisteredPropertyById)
    app.get(`${userUrl}/:userId/properties`, findPropertiesForUser)
    app.post(propertyUrl, createProperties)
    app.delete(`${propertyUrl}/:zpid`, deleteProperties)
    app.put(`${propertyUrl}/:zpid`, updateProperties)
    app.get(`${propertyUrl}/bridge/:zpid`, getSpecificExternalProperty)
}
