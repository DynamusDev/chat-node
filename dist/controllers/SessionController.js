"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authConfig = require('../../config/auth.json');
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const sendMail_1 = require("../config/sendMail");
const user_view_1 = require("../views/user_view");
exports.default = {
    async create(request, response) {
        // #swagger.tags = ['Session']
        // #swagger.description = 'Endpoint para criar os usuários.'
        /* #swagger.parameters['Data'] = {
                  in: 'body',
                  required: true,
                  description: 'Dados de login',
                  type: 'object',
                  schema: { $ref: "#/definitions/Session" },
        } */
        const { email, password } = request.body;
        const usr = typeorm_1.getRepository(User_1.default);
        const user = await usr.findOne({ where: { email: email }, relations: ['messages', 'transactions'] });
        if (!user) {
            /* #swagger.responses[403] = {
              schema: { $ref: "#/definitions/ErrorUserDeleted" },
              error: 'Este usuário não está mais cadastrado na nossa base de dados'
            } */
            return response.status(200).json({
                status: 403,
                error: 'Este usuário não está cadastrado na nossa base de dados'
            });
        }
        else {
            if (user.deletedAt) {
                /* #swagger.responses[403] = {
                    schema: { $ref: "#/definitions/ErrorUserDeleted" },
                    error: 'Este usuário não está mais cadastrado na nossa base de dados'
                  } */
                return response.status(200).json({
                    status: 403,
                    error: 'Este usuário não está mais cadastrado na nossa base de dados'
                });
            }
            else {
                try {
                    let isValidPass = false;
                    isValidPass = await bcryptjs_1.default.compare(password, user.password);
                    if (!isValidPass) {
                        /* #swagger.responses[401] = {
                          schema: { $ref: "#/definitions/ErrorSessionPassword" },
                          error: 'Falha no Login, senha inválida'
                        } */
                        return response.status(200).json({
                            status: 401,
                            error: 'Falha no Login, senha inválida'
                        });
                    }
                    else {
                        const token = jsonwebtoken_1.default.sign({ id: user.id }, authConfig.secret, {
                            expiresIn: 86400,
                        });
                        /* #swagger.responses[201] = {
                          schema: { $ref: "#/definitions/SuccessSession" },
                          message: 'Succesfuly'
                        } */
                        return response.status(201).json({
                            status: 201,
                            message: 'Succesfuly',
                            user: user_view_1.userRender(user),
                            token: token
                        });
                    }
                }
                catch (err) {
                    return response.status(500).json({ error: 'Bcrypt function error' });
                }
            }
        }
    },
    async forgotPassword(request, response) {
        // #swagger.tags = ['Session']
        // #swagger.description = 'Endpoint para criar os usuários.'
        /* #swagger.parameters['Data'] = {
                  in: 'body',
                  required: true,
                  description: 'Dados de login',
                  type: 'object',
                  schema: { $ref: "#/definitions/ForgotPassword" },
        } */
        const { email } = request.body;
        const usr = typeorm_1.getRepository(User_1.default);
        const user = await usr.findOne({ email: email });
        if (!user) {
            /* #swagger.responses[403] = {
              schema: { $ref: "#/definitions/ErrorUserDeleted" },
              error: 'Este usuário não está cadastrado na nossa base de dados'
            } */
            return response.status(200).json({
                status: 403,
                error: 'Este usuário não está cadastrado na nossa base de dados'
            });
        }
        if (user.deletedAt) {
            /* #swagger.responses[403] = {
                schema: { $ref: "#/definitions/ErrorUserDeleted" },
                error: 'Este usuário não está mais cadastrado na nossa base de dados'
              } */
            return response.status(200).json({
                status: 403,
                error: 'Este usuário não está mais cadastrado na nossa base de dados'
            });
        }
        else {
            const newPassword = crypto_1.default.randomBytes(6).toString('hex');
            let hashedPassword;
            try {
                hashedPassword = await bcryptjs_1.default.hash(newPassword, 12);
            }
            catch (err) { }
            const resetPassword = usr.merge(user, {
                password: hashedPassword
            });
            await usr.save(resetPassword);
            const emailASerEnviado = {
                from: 'naorespondastarthos@gmail.com',
                to: email,
                subject: 'Esqueci Minha Senha - Dynamusdev',
                text: `Você solicitou a alteração de senha no nosso app e uma nova senha foi gerada automaticamente.\n
                  Login: ${email}
                  Senha: ${newPassword} \n
                  (fique atento com as letras minúsculas e maiúsculas)\n
                  Você ja pode logar na sua conta com sua senha nova e poderá trocar a senha através do painel no botão de acesso "editar".\n
                  Obrigado,
                  Equipe Starthos`,
            };
            sendMail_1.transport.sendMail(emailASerEnviado, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    /* #swagger.responses[200] = {
                      schema: { $ref: "#/definitions/SuccessChangePass" },
                      message: 'Uma nova senha foi enviada para o seu email!!!'
                    } */
                    return response.status(200).json({
                        status: 200,
                        message: 'Uma nova senha foi enviada para o seu email!!!'
                    });
                }
            });
        }
    },
};
