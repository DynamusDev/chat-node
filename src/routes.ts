import express from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
const upload = multer(uploadConfig);

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import ChatController from './controllers/ChatController';
import TransactionController from './controllers/TransactionController';
import UploadController from './controllers/UploadController';

export const routes = express.Router();

routes.post('/login', SessionController.create); //Criar Sessão(LOGIN)
routes.post('/forgot_password', SessionController.forgotPassword); //Esqueci minha senha

routes.post('/users/create', UserController.create); // Criar usuário
routes.patch('/users/edit/:id', UserController.edit); // Editar usuário
routes.get('/users/list', UserController.list); // Listar usuários
routes.delete('/users/delete/:id', UserController.delete); // Deletar usuários

routes.post('/chat/send', ChatController.create); // Enviar mensagem
routes.get('/chat/list', ChatController.list); // Listar mensagens

routes.post('/transactions/create', TransactionController.create); // Criar transação
routes.get('/transactions/list', TransactionController.list); // Listar transações

routes.post('/upload', upload.single('image'), UploadController.upload)