const express = require('express');
const UserController = require('./Controllers/UserController');
const InviteController = require('./Controllers/InviteController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.indexById);
routes.get('/users/:id/invites', InviteController.index);
routes.post('/users', UserController.store);
routes.post('/users/:id/invites', InviteController.store);
routes.patch('/users/:id', UserController.update);
routes.delete('/users/:id/invites/:inviteId', InviteController.destroy);

module.exports = routes;