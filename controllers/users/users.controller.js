const usersService = require('../../services/users/user-service');
const userUrl = "/api/users";

module.exports = (app) => {
    const findUserById = (req, res) => {
        usersService.findUserById(req.params['userId'])
            .then(user => res.json(user));
    };

    const deleteUser = (req, res) => {
        usersService.deleteUser(req.params['userId'])
            .then(user => res.json(user));
    };

    const findAllUsers = (req, res) => {
        usersService.findAllUsers()
            .then(users => res.send(users));
    };

    const createUser = (req, res) => {
        usersService.addUser(req.body)
            .then(actualUser => res.json(actualUser));
    };

    const updateUser = (req, res) => {
        usersService.updateUser(req.params['userId'], req.body)
            .then(updatedUser => res.json(updatedUser))
    };

    app.get(userUrl, findAllUsers);
    app.get(`${userUrl}/:userId`, findUserById);
    app.post(userUrl, createUser);
    app.put(`${userUrl}/:userId`, updateUser);
    app.delete(`${userUrl}/:userId`, deleteUser);
};
