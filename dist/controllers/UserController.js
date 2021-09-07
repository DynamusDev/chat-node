"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Yup = __importStar(require("yup"));
const user_view_1 = require("../views/user_view");
exports.default = {
    async create(request, response) {
        // #swagger.tags = ['User']
        // #swagger.description = 'Endpoint para cadastrar os usuários.'
        /* #swagger.parameters['Data'] = {
                  in: 'body',
                  required: true,
                  description: 'Dados do usuário',
                  type: 'object',
                  schema: { $ref: "#/definitions/UserTemplate" },
        } */
        const { name, email, password } = request.body;
        const userRepository = typeorm_1.getRepository(User_1.default);
        const user = await userRepository.findOne({ email: email });
        if (user) {
            /* #swagger.responses[400] = {
                    schema: { $ref: "#/definitions/CreateError" },
                    error: 'Esse usuário já existe'
            } */
            return response.status(400).json({ error: 'Esse usuário já existe' });
        }
        else {
            let hashedPassword;
            try {
                hashedPassword = await bcryptjs_1.default.hash(password, 12);
            }
            catch (err) {
                console.error(err);
            }
            const newUser = userRepository.create({
                name,
                email,
                password: hashedPassword,
                createdAt: new Date(),
            });
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().required(),
                password: Yup.string().required()
            });
            await schema.validate(newUser, {
                abortEarly: false
            });
            await userRepository.save(newUser);
            /* #swagger.responses[200] = {
                    schema: { $ref: "#/definitions/User" },
                    message: 'O usuário foi cadastrado!!!'
            } */
            /* #swagger.responses[400] = {
                    schema: { $ref: "#/definitions/CreateError" },
                    error: 'Esse usuário já existe'
            } */
            return response.status(200).json({
                status: 200,
                message: 'O usuário ' + name + ' foi cadastrado!!!',
                user: user_view_1.userRender(newUser)
            });
        }
    },
    async edit(request, response) {
        // #swagger.tags = ['User']
        // #swagger.description = 'Endpoint para alterar os dados do usuário.'
        /* #swagger.parameters['Data'] = {
                  in: 'body',
                  required: true,
                  description: 'Dados do usuário',
                  type: 'object',
                  schema: { $ref: "#/definitions/EditUserTemplate" },
        } */
        const { id } = request.params;
        const { name, email, password, image } = request.body;
        const userRepository = typeorm_1.getRepository(User_1.default);
        let hashedPassword;
        try {
            hashedPassword = await bcryptjs_1.default.hash(password, 12);
        }
        catch (err) {
            console.error(err);
        }
        const user = await userRepository.findOne(id, { relations: ['messages', 'transactions'] });
        userRepository.merge(user, {
            name,
            email,
            password: hashedPassword,
            image
        });
        await userRepository.save(user);
        /* #swagger.responses[200] = {
                  schema: { $ref: "#/definitions/User" },
                  message: 'Dados do usuário foram atualizados!!!'
          } */
        return response.status(200).json({
            status: 200,
            message: 'Dados do usuário ' + name + ' foram atualizados!!!',
            user: user_view_1.userRender(user)
        });
    },
    async list(request, response) {
        // #swagger.tags = ['User']
        // #swagger.description = 'Endpoint para mostrar os usuários.'
        const userRepository = typeorm_1.getRepository(User_1.default);
        const users = (await userRepository.find({ where: { deletedAt: null }, relations: ['messages', 'transactions'] }));
        /* #swagger.responses[200] = {
                schema: { $ref: "#/definitions/Users" },
                message: 'O usuário foi cadastrado!!!'
        } */
        return response.status(200).json({
            status: 200,
            users: user_view_1.userRenderMany(users)
        });
    },
    async delete(request, response) {
        // #swagger.tags = ['User']
        // #swagger.description = 'Endpoint para deletar um usuário.'
        const userRepository = typeorm_1.getRepository(User_1.default);
        const { id } = request.params;
        const user = await userRepository.findOneOrFail(id);
        userRepository.merge(user, {
            deletedAt: new Date()
        });
        await userRepository.save(user);
        /* #swagger.responses[200] = {
                  schema: { $ref: "#/definitions/DeletedUser" },
                  description: 'Usuários Deletado'
          } */
        return response.status(200).json({
            status: 200,
            message: `Succesfuly user deleted`,
        });
    }
};
