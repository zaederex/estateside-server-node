const appointmentsService = require("../../services/appointments/appointments.service.server");
const propertyUrl = '/api/properties';
const appointmentsUrl = '/api/appointments';
const userUrl = '/api/users';

module.exports = (app) => {
    const findAppointmentsForProperty = (req, res) => {
        const zpid = req.params['zpid'];
        appointmentsService.findAppointmentsForProperty(zpid)
            .then(appointments => res.json(appointments));
    };

    const findAppointmentsForUser = (req, res) => {
        const userId = req.params["userId"];
        appointmentsService.findAppointmentsForUser(userId)
            .then(appointments => res.json(appointments));
    };

    const createAppointmentForProperty = (req, res) => {
        const appointment = req.body;
        appointmentsService.createAppointmentForProperty(appointment)
            .then(newAppointment=> res.json(newAppointment));
    };

    const deleteAppointment = (req, res) => {
        const userId = req.params['userId'];
        const zpid = req.params['zpid'];
        appointmentsService.deleteAppointment(zpid, userId)
            .then(status => res.send(status));
    };

    app.get(`${propertyUrl}/:zpid/appointments`, findAppointmentsForProperty);
    app.get(`${userUrl}/:userId/appointments`, findAppointmentsForUser);
    app.post(`${propertyUrl}/:zpid/appointments`, createAppointmentForProperty);
    app.delete(`${propertyUrl}/:zpid/appointments/:userId`, deleteAppointment);
};
