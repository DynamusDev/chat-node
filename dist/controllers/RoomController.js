"use strict";
// import { Request, Response } from 'express';
// import { getRepository } from 'typeorm';
// import Room from '../models/Room';
// export default {
//   async create(request: Request, response: Response) {
//     // #swagger.tags = ['Message']
//     // #swagger.description = 'Endpoint para enviar as mensagens.'
//     /* #swagger.parameters['Data'] = {
//               in: 'body',
//               required: true,
//               description: 'Sua Mensagem',
//               type: 'object',
//               schema: { $ref: "#/definitions/MessageTemplate" },
//     } */
//     const {
//       message,
//       author
//     } = request.body;
//     const chatRepository = getRepository(Chat);
//     const data = {
//       message,
//       author,
//       createdAt: new Date(),
//     }
//     const newMessage = chatRepository.create(data)
//     await chatRepository.save(newMessage)
//     /* #swagger.responses[200] = { 
//             schema: { $ref: "#/definitions/User" },
//             message: 'O usuário foi cadastrado!!!' 
//     } */
//     /* #swagger.responses[400] = { 
//             schema: { $ref: "#/definitions/CreateError" },
//             error: 'Esse usuário já existe' 
//     } */
//     request.socket.emit('chat', data)
//     return response.status(200).json({
//       status: 200,
//       message: 'mensagem enviada!!!',
//       user: newMessage
//     });
//   },
//   async list(request: Request, response: Response) {
//     // #swagger.tags = ['Message']
//     // #swagger.description = 'Endpoint para listar as mensagens.'
//     const chatRepository = getRepository(Chat);
//     const messages = (await chatRepository.find({ where: { deletedAt: null } }));
//     /* #swagger.responses[200] = { 
//             schema: { $ref: "#/definitions/Messages" },
//             message: 'O usuário foi cadastrado!!!' 
//     } */
//     return response.status(200).json({
//       status: 200,
//       message: 'mensagem enviada!!!',
//       messages
//     });
//   }
// };
