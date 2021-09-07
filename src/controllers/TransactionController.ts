import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import { transactionRender, transactionRenderMany } from '../views/transactions_view';

export default {
  async create(request: Request, response: Response) {
    // #swagger.tags = ['Transactions']
    // #swagger.description = 'Endpoint para criar transações.'
    /* #swagger.parameters['Data'] = {
              in: 'body',
              required: true,
              description: 'Nova transação',
              type: 'object',
              schema: { $ref: "#/definitions/TransactionTemplate" },
    } */
    const {
      title,
      type,
      category,
      amount,
      user
    } = request.body;

    const transactionRepository = getRepository(Transaction);

    const data = {
      title,
      type,
      category,
      amount,
      user,
      createdAt: new Date(),
    }

    const newTransaction = transactionRepository.create(data)

    await transactionRepository.save(newTransaction)

    /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/Transaction" },
            message: 'transação realizada' 
    } */
    request.socket.emit('transaction', data)

    return response.status(200).json({
      status: 200,
      message: 'transação realizada',
      transation: transactionRender(newTransaction)
    });
  },

  async list(request: Request, response: Response) {
    // #swagger.tags = ['Transactions']
    // #swagger.description = 'Endpoint para mostrar as transações.'
    const transactionRepository = getRepository(Transaction);

    const transactions = (await transactionRepository.find());

    /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/Transactions" },
            message: 'O usuário foi cadastrado!!!' 
    } */
    return response.status(200).json({
      status: 200,
      transactions: transactionRenderMany(transactions)
    });
  }
};