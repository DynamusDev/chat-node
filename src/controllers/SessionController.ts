import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import jwt from 'jsonwebtoken';
const authConfig = require('../../config/auth.json');
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import { transport } from '../config/sendMail';
import { userRender } from '../views/user_view';

export default {
  async create(request: Request, response: Response) {
    // #swagger.tags = ['Session']
    // #swagger.description = 'Endpoint para criar os usuários.'
    /* #swagger.parameters['Data'] = {
              in: 'body',
              required: true,
              description: 'Dados de login',
              type: 'object',
              schema: { $ref: "#/definitions/Session" },
    } */
    const {
      email,
      password
    } = request.body;
    const usr = getRepository(User);
    const user = await usr.findOne({ where: { email: email }, relations: ['messages'] });

    if (!user) {
      /* #swagger.responses[403] = { 
        schema: { $ref: "#/definitions/ErrorUserDeleted" },
        error: 'Este usuário não está mais cadastrado na nossa base de dados'
      } */
      return response.status(200).json({
        status: 403,
        error: 'Este usuário não está cadastrado na nossa base de dados'
      });
    } else {
      if (user.deletedAt) {
        /* #swagger.responses[403] = { 
            schema: { $ref: "#/definitions/ErrorUserDeleted" },
            error: 'Este usuário não está mais cadastrado na nossa base de dados'
          } */
        return response.status(200).json({
          status: 403,
          error: 'Este usuário não está mais cadastrado na nossa base de dados'
        });
      } else {
        try {
          let isValidPass = false;
          isValidPass = await bcrypt.compare(password, user.password);

          if (!isValidPass) {
            /* #swagger.responses[401] = { 
              schema: { $ref: "#/definitions/ErrorSessionPassword" },
              error: 'Falha no Login, senha inválida'
            } */
            return response.status(200).json({
              status: 401,
              error: 'Falha no Login, senha inválida'
            });
          } else {
            const token = jwt.sign({ id: user.id }, authConfig.secret, {
              expiresIn: 86400,
            })

            /* #swagger.responses[201] = { 
              schema: { $ref: "#/definitions/SuccessSession" },
              message: 'Succesfuly' 
            } */

            

            return response.status(201).json({
              status: 201,
              message: 'Succesfuly',
              user: userRender(user),
              token: token
            });
          }
        } catch (err) {
          return response.status(500).json({ error: 'Bcrypt function error' })
        }
      }
    }
  },

  async forgotPassword(request: Request, response: Response) {
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
    const usr = getRepository(User);

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
      } else {
        const newPassword = crypto.randomBytes(6).toString('hex');

        let hashedPassword;
        try {
          hashedPassword = await bcrypt.hash(newPassword, 12);
        } catch (err) { }

        const resetPassword = usr.merge(user, {
          password: hashedPassword
        })

        await usr.save(resetPassword)

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

        transport.sendMail(emailASerEnviado,
          function (err: any) {
            if (err) {
              console.log(err)
            } else {
              /* #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/SuccessChangePass" },
                message: 'Uma nova senha foi enviada para o seu email!!!' 
              } */
              return response.status(200).json({
                status: 200,
                message: 'Uma nova senha foi enviada para o seu email!!!'
              })
            }
          },
        )
      }
  },
};