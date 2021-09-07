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
        version: "1.0.2",
        title: "Dynamusdev API",
        description: "Documentação para a API Dynamusdev."
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
            "name": "Transactions",
            "description": "Create and List"
        },
        {
            "name": "Upload",
            "description": "Upload images, videos and audios"
        },
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
        EditUserTemplate: {
            name: 'Alexandre Alves Nascimento',
            email: 'alexandrenascimento@live.com',
            image: 'https://img.icons8.com/officel/2x/person-male-skin-type-6.png',
            password: 'q1w2e3r4'
        },
        ForgotPassword: {
            email: 'alexandrenascimento@live.com',
        },
        SuccessChangePass: {
            status: 200,
            message: 'Uma nova senha foi enviada para o seu email',
        },
        MessageTemplate: {
            message: 'E aí, qual vai ser?',
            author: 1
        },
        TransactionTemplate: {
            title: 'Freelance de website',
            category: 'Desenvolvimento',
            type: 'deposit',
            amount: 6000,
            user: 1
        },
        Transaction: {
            title: 'Freelance de website',
            category: 'Desenvolvimento',
            type: 'deposit',
            amount: 6000,
            user: {}
        },
        Transactions: {
            transactions: []
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
            message: 'Mensagem enviada'
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
    }
};
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require(`./server.${process.env.EXTENSION}`);
});
