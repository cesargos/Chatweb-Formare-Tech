const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const ChatController = require('./controllers/ChatController');

//retorna toda a conversa do chat
routes.get('/chat', ChatController.index);

//adiciona nova mensagem no site
routes.post('/chat',ChatController.store);

//deleta a mensagem do chat
routes.delete('/chat/:id',ChatController.destroy);

//procura participante por nome
routes.get('/users/user',UserController.userName);

//retorna os participantes do site
routes.get('/users',UserController.users);

//cria novo participante no site
routes.post('/users',UserController.newUser);


module.exports = routes;