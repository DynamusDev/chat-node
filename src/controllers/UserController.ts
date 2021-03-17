import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';

export default {
  async create(request: Request, response: Response) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para criar os usuários.'
    /* #swagger.parameters['Data'] = {
              in: 'body',
              required: true,
              description: 'Dados do usuário',
              type: 'object',
              schema: { $ref: "#/definitions/UserTemplate" },
    } */
    const {
      name,
      email,
      password
    } = request.body;

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ email: email });

    if (user) {
      /* #swagger.responses[400] = { 
              schema: { $ref: "#/definitions/CreateError" },
              error: 'Esse usuário já existe' 
      } */
      return response.status(400).json({ error: 'Esse usuário já existe' })
    } else {
      let hashedPassword;

      try {
        hashedPassword = await bcrypt.hash(password, 12);
      } catch (err) {
        console.error(err);
      }

      const newUser = userRepository.create({
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      })

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required()
      })

      await schema.validate(newUser, {
        abortEarly: false
      })

      await userRepository.save(newUser)

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
        user: newUser
      });
    }
  }
};