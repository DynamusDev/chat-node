"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Chat_1 = __importDefault(require("../models/Chat"));
exports.default = {
    async create(request, response) {
        // #swagger.tags = ['Message']
        // #swagger.description = 'Endpoint para enviar as mensagens.'
        /* #swagger.parameters['Data'] = {
                  in: 'body',
                  required: true,
                  description: 'Sua Mensagem',
                  type: 'object',
                  schema: { $ref: "#/definitions/MessageTemplate" },
        } */
        const { message, author } = request.body;
        const chatRepository = typeorm_1.getRepository(Chat_1.default);
        const data = {
            message,
            author,
            createdAt: new Date(),
        };
        const newMessage = chatRepository.create(data);
        await chatRepository.save(newMessage);
        /* #swagger.responses[200] = {
                schema: { $ref: "#/definitions/User" },
                message: 'O usuário foi cadastrado!!!'
        } */
        /* #swagger.responses[400] = {
                schema: { $ref: "#/definitions/CreateError" },
                error: 'Esse usuário já existe'
        } */
        request.socket.emit('chat', data);
        return response.status(200).json({
            status: 200,
            message: 'mensagem enviada!!!',
            user: newMessage
        });
    },
    async list(request, response) {
        // #swagger.tags = ['Message']
        // #swagger.description = 'Endpoint para listar as mensagens.'
        const chatRepository = typeorm_1.getRepository(Chat_1.default);
        const messages = (await chatRepository.find({ where: { deletedAt: null } }));
        /* #swagger.responses[200] = {
                schema: { $ref: "#/definitions/Messages" },
                message: 'O usuário foi cadastrado!!!'
        } */
        return response.status(200).json({
            status: 200,
            message: 'mensagem enviada!!!',
            messages
        });
    }
};
