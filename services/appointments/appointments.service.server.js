const appointmentsDao = require("../../daos/appointments/appointments.dao.server");

const findAppointmentsForProperty = (zpid) =>
        appointmentsDao.findAppointmentsForProperty(zpid)

const findAppointmentsForUser = (userId) =>
        appointmentsDao.findAppointmentsForUser(userId)

const createAppointmentForProperty = (appointment) =>
        appointmentsDao.createAppointmentForProperty(appointment)

const deleteAppointment = (zpid, userId) =>
        appointmentsDao.deleteAppointment(zpid, userId)

module.exports = {
    findAppointmentsForProperty,
    findAppointmentsForUser,
    createAppointmentForProperty,
    deleteAppointment
};
