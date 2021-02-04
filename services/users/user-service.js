const userDao = require('../../daos/users/users.dao');

const findUserById = (userId) => userDao.findUserById(userId);

const deleteUser = (userId) => userDao.deleteUser(userId);

const findAllUsers = () => userDao.findAllUsers();

const addUser = (user) => userDao.addUser(user);

const updateUser = (userId, user) => userDao.updateUser(userId, user);

module.exports = {findUserById, addUser, findAllUsers, updateUser, deleteUser};
