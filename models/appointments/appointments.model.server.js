const mongoose = require("mongoose");
const appointmentsSchema = require("./appointments.schema.server");
const appointmentsModel = mongoose.model("AppointmentsModel", appointmentsSchema);

module.exports = appointmentsModel;
