const express = require('express');
const UserController = require('./Controllers/UserController');
const InviteController = require('./Controllers/InviteController');
const Login = require('./login');
const verifyJwt = require('./verifyJwt');

const routes = express.Router();

routes.get('/users', verifyJwt, UserController.index);
routes.get('/users/:id', verifyJwt, UserController.indexById);
routes.get('/invites', verifyJwt, InviteController.index);
routes.post('/login', Login.login);
routes.post('/users', UserController.store);
routes.post('/users/:id/invites', verifyJwt, InviteController.store);
routes.patch('/users/:id', verifyJwt, UserController.update);
routes.delete('/invites/:inviteId', verifyJwt, InviteController.destroy);

module.exports = routes;