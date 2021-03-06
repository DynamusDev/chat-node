import express from 'express';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import ChatController from './controllers/ChatController';

export const routes = express.Router();

routes.post('/login', SessionController.create); //Criar Sessão(LOGIN)
// routes.post('/forgot_password', SessionController.forgotPassword); //Esqueci minha senha

routes.post('/users/create', UserController.create); // Criar usuário
routes.get('/users/list', UserController.list); // Listar usuários
routes.delete('/users/delete/:id', UserController.delete); // Deletar usuários

routes.post('/chat/send', ChatController.create); // Enviar mensagem
routes.get('/chat/list', ChatController.list); // Listar mensagens

routes.get('/teste/gamers', ChatController.get); // Enviar mensagem