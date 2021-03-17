import express from 'express';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import ChatController from './controllers/ChatController';

export const routes = express.Router();

routes.post('/login', SessionController.create); //Criar Sessão(LOGIN)
// routes.post('/forgot_password', SessionController.forgotPassword); //Esqueci minha senha

routes.post('/users/create', UserController.create); // Criar usuário

routes.post('/chat/send', ChatController.create); // Enviar mensagem
routes.get('/chat/list', ChatController.list); // Listar mensagens