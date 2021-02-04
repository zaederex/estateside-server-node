const usersModel = require('../../models/users/users.model');

const findUserById = (userId) => usersModel.findOne({userId: userId});

const deleteUser  = (userId) => usersModel.deleteOne({userId: userId});

const addUser = (user) => usersModel.create(user);

const findAllUsers = () => usersModel.find({});

const updateUser = (userId, user) => usersModel.update({userId: userId}, {$set: user});

module.exports = {findUserById, addUser, findAllUsers, updateUser, deleteUser};
