const express = require('express');
const environment = require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 8080;

const app = express();

const mongoose = require('mongoose');
mongoose.connect(`${process.env.DB_URL}`, {useNewUrlParser: true});

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors());

app.use(express.json());

// app.use('/api/auth/', authRouter);
app.get('/', (req, res) => {
    res.send('Application server is running.')
});

require('./controllers/users/AuthenticationController')(app);
require('./controllers/properties/properties.controller')(app);
require('./controllers/users/users.controller')(app);
require('./controllers/contacts/contacts.controller')(app);
require('./controllers/appointments/appointments.controller.server')(app);
require('./controllers/favourites/favourites.controller')(app);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin",
               '*');
    res.header("Access-Control-Allow-Headers",
               "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
               "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// global error handler
// app.use(function (err, req, res, next) {
//     res.status(500).send();
// });

app.listen(PORT);
