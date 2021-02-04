const mongoose = require("mongoose");
const favouritesSchema = require("./favourites.schema.server");
const favouritesModel = mongoose.model("FavouritesModel", favouritesSchema);

module.exports = favouritesModel;
