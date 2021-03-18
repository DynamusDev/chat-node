"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const SessionController_1 = __importDefault(require("./controllers/SessionController"));
const ChatController_1 = __importDefault(require("./controllers/ChatController"));
exports.routes = express_1.default.Router();
exports.routes.post('/login', SessionController_1.default.create); //Criar Sessão(LOGIN)
// routes.post('/forgot_password', SessionController.forgotPassword); //Esqueci minha senha
exports.routes.post('/users/create', UserController_1.default.create); // Criar usuário
exports.routes.get('/users/list', UserController_1.default.list); // Listar usuários
exports.routes.delete('/users/delete/:id', UserController_1.default.delete); // Deletar usuários
exports.routes.post('/chat/send', ChatController_1.default.create); // Enviar mensagem
exports.routes.get('/chat/list', ChatController_1.default.list); // Listar mensagens
