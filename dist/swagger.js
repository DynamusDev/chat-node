"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerAutogen = require('swagger-autogen')();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const outputFile = `./src/swagger_output.json`;
const endpointsFiles = [`./${process.env.ROUTE}routes.${process.env.EXTENSION}`];
const doc = {
    info: {
        version: "1.0.1",
        title: "Cadmus API",
        description: "Documentação para a API do Chat Cadmus."
    },
    host: process.env.SWAGGER_HOST,
    basePath: "/",
    schemes: process.env.PROTOCOL,
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Session",
            "description": "Login and Forgot-Password"
        },
        {
            "name": "User",
            "description": "Create, Edit, List and Delete"
        },
        {
            "name": "Message",
            "description": "Send"
        },
        {
            "name": "Teste Cadmus",
            "description": "Get gamer data"
        }
    ],
    definitions: {
        User: {
            name: 'Alexandre Nascimento',
            email: 'alexandrenascimento@live.com',
            password: 'q1w2e3r4',
            image: 'https://img.icons8.com/ios-filled/72/user.png'
        },
        UserTemplate: {
            name: 'Alexandre Nascimento',
            email: 'alexandrenascimento@live.com',
            password: 'q1w2e3r4',
        },
        MessageTemplate: {
            message: 'E aí, qual vai ser?',
            author: 1
        },
        CreateError: {
            error: 'Esse usuário já existe'
        },
        Token: {
            authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjEzNTczNzQ3LCJleHAiOjE2MTM2NjAxNDd9.3K2XUMOLtN8pLqQnHTx4reh_D87553KieZm8PFQOGV8"
        },
        Send: {
            sbid: 2,
            value: 256,
            user: 1
        },
        SendMessage: {
            message: 'Comando enviado!!!'
        },
        Messages: {
            messages: []
        },
        Users: {
            users: []
        },
        Session: {
            email: 'alexandrenascimento@live.com',
            password: 'q1w2e3r4',
        },
        ErrorUserDeleted: {
            status: 403,
            error: 'Este usuário não está mais cadastrado na nossa base de dados'
        },
        ErrorSessionPassword: {
            status: 401,
            error: 'Falha no Login, senha inválida'
        },
        SuccessSession: {
            status: 201,
            message: 'Succesfuly',
            user: {},
            token: 'token'
        },
        DeletedUser: {
            status: 200,
            message: `Succesfuly user deleted`,
        },
        GamerResponse: {
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
        }
    }
};
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require(`./server.${process.env.EXTENSION}`);
});
