"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("./config/upload"));
const upload = multer_1.default(upload_1.default);
const UserController_1 = __importDefault(require("./controllers/UserController"));
const SessionController_1 = __importDefault(require("./controllers/SessionController"));
const ChatController_1 = __importDefault(require("./controllers/ChatController"));
const TransactionController_1 = __importDefault(require("./controllers/TransactionController"));
const UploadController_1 = __importDefault(require("./controllers/UploadController"));
exports.routes = express_1.default.Router();
exports.routes.post('/login', SessionController_1.default.create); //Criar Sessão(LOGIN)
exports.routes.post('/forgot_password', SessionController_1.default.forgotPassword); //Esqueci minha senha
exports.routes.post('/users/create', UserController_1.default.create); // Criar usuário
exports.routes.patch('/users/edit/:id', UserController_1.default.edit); // Editar usuário
exports.routes.get('/users/list', UserController_1.default.list); // Listar usuários
exports.routes.delete('/users/delete/:id', UserController_1.default.delete); // Deletar usuários
exports.routes.post('/chat/send', ChatController_1.default.create); // Enviar mensagem
exports.routes.get('/chat/list', ChatController_1.default.list); // Listar mensagens
exports.routes.post('/transactions/create', TransactionController_1.default.create); // Criar transação
exports.routes.get('/transactions/list', TransactionController_1.default.list); // Listar transações
exports.routes.post('/upload', upload.single('image'), UploadController_1.default.upload);
