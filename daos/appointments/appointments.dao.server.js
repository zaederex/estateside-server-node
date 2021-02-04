const appointmentsModel = require("../../models/appointments/appointments.model.server");

const findAppointmentsForProperty = (zpid) => {
    return (
        appointmentsModel.find({zpid: zpid})
    )
};

const findAppointmentsForUser = (userId) => {
    return (
        appointmentsModel.find({userId: userId})
    )
};

const createAppointmentForProperty = (appointment) => {
    return (
        appointmentsModel.create(appointment)
    )
};

const deleteAppointment = (zpid, userId) => {
    return (
        appointmentsModel.deleteOne({zpid: zpid, userId: userId})
    )
};

module.exports = {
    findAppointmentsForProperty,
    findAppointmentsForUser,
    createAppointmentForProperty,
    deleteAppointment
};
