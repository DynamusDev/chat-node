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
    },
    async get(request, response) {
        // #swagger.tags = ['Teste Cadmus']
        // #swagger.description = 'Endpoint para pegas as infos do teste de Frontend Cadmus.'
        /* #swagger.responses[200] = {
                schema: { $ref: "#/definitions/GamerResponse" },
                message: 'O usuário foi cadastrado!!!'
        } */
        return response.status(200).json({
            status: 200,
            "user": {
                "id": 11231,
                "name": "Cadmus gameplay",
                "email": "gameplay.cadmus@cadmus.com.br",
                "image": "http://google.com.br",
                "experience": 1150,
                "maxExperience": 2100,
                "matches": [
                    {
                        "image": "http://google.com.br",
                        "title": "lobby",
                        "victory": 235,
                        "defeat": 432,
                        "button": {
                            "icon": "https://google.com.br",
                            "title": "ir para o lobby",
                            "link": "https:google.com.br"
                        }
                    },
                    {
                        "image": "http://google.com.br",
                        "title": "ranked",
                        "victory": 235,
                        "defeat": 432,
                        "playersWaiting": 15,
                        "button": {
                            "icon": "https://google.com.br",
                            "title": "entrar na fila",
                            "link": "https:google.com.br"
                        }
                    }
                ]
            },
            "levels": {
                "casual": 1,
                "amateur": 700,
                "competitive": 1400,
                "professional": 2100
            },
            "roms": [
                {
                    "id": 123,
                    "title": "Sala SWAT",
                    "category": "front",
                    "map": "map_votorantim",
                    "players": 6,
                    "capacity": 12,
                    "image": "http://google.com.br"
                },
                {
                    "id": 15,
                    "title": "Super Backends",
                    "category": "backend",
                    "map": "map_sp",
                    "players": 10,
                    "capacity": 12,
                    "image": "http://google.com.br"
                },
                {
                    "id": 321,
                    "title": "Sala Projetos",
                    "category": "fullstack",
                    "map": "map_brasil",
                    "players": 1,
                    "capacity": 6
                },
                {
                    "id": 111,
                    "title": "Sala Numero 111",
                    "category": "fullstack",
                    "map": "map_react",
                    "players": 12,
                    "capacity": 12,
                    "image": "http://google.com.br"
                },
                {
                    "id": 175,
                    "title": "Sala Super Senior",
                    "category": "front",
                    "map": "map_javascript",
                    "players": 7,
                    "capacity": 12,
                    "image": "http://google.com.br"
                },
                {
                    "id": 162,
                    "title": "Sala EstagiÃ¡rios",
                    "category": "backend",
                    "map": "map_java",
                    "players": 3,
                    "capacity": 12,
                    "image": "http://google.com.br"
                }
            ],
            "online": 123,
            "bans": 150
        });
    }
};
