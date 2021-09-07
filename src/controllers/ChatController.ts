import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Chat from '../models/Chat';
import { chatRender, chatRenderMany } from '../views/chat_view'

export default {
  async create(request: Request, response: Response) {
    // #swagger.tags = ['Message']
    // #swagger.description = 'Endpoint para enviar as mensagens.'
    /* #swagger.parameters['Data'] = {
              in: 'body',
              required: true,
              description: 'Sua Mensagem',
              type: 'object',
              schema: { $ref: "#/definitions/MessageTemplate" },
    } */
    const {
      message,
      author
    } = request.body;

    const chatRepository = getRepository(Chat);

    const data = {
      message,
      author,
      createdAt: new Date(),
    }

    const newMessage = chatRepository.create(data)

    await chatRepository.save(newMessage)

    /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/SendMessage" },
            message: 'O usuário foi cadastrado!!!' 
    } */
    request.socket.emit('chat', data)
    return response.status(200).json({
      status: 200,
      message: 'mensagem enviada!!!',
      sendedMessage: chatRender(newMessage)
    });
  },

  async list(request: Request, response: Response) {
    // #swagger.tags = ['Message']
    // #swagger.description = 'Endpoint para mostrar as mensagens.'
    const chatRepository = getRepository(Chat);

    const messages = (await chatRepository.find({ where: { deletedAt: null } }));

    /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/Messages" },
            message: 'O usuário foi cadastrado!!!' 
    } */
    return response.status(200).json({
      status: 200,
      messages: chatRenderMany(messages)
    });
  }
};