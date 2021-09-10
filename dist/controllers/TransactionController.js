"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Transaction_1 = __importDefault(require("../models/Transaction"));
const transactions_view_1 = require("../views/transactions_view");
exports.default = {
    async create(request, response) {
        // #swagger.tags = ['Transactions']
        // #swagger.description = 'Endpoint para criar transações.'
        /* #swagger.parameters['Data'] = {
                  in: 'body',
                  required: true,
                  description: 'Nova transação',
                  type: 'object',
                  schema: { $ref: "#/definitions/TransactionTemplate" },
        } */
        const { title, type, category, amount, user } = request.body;
        const transactionRepository = typeorm_1.getRepository(Transaction_1.default);
        const data = {
            title,
            type,
            category,
            amount,
            user,
            createdAt: new Date(),
        };
        const newTransaction = transactionRepository.create(data);
        await transactionRepository.save(newTransaction);
        /* #swagger.responses[200] = {
                schema: { $ref: "#/definitions/Transaction" },
                message: 'transação realizada'
        } */
        request.socket.emit('transaction', data);
        return response.status(200).json({
            status: 200,
            message: 'transação realizada',
            transation: newTransaction
        });
    },
    async list(request, response) {
        // #swagger.tags = ['Transactions']
        // #swagger.description = 'Endpoint para mostrar as transações.'
        const transactionRepository = typeorm_1.getRepository(Transaction_1.default);
        const transactions = (await transactionRepository.find());
        /* #swagger.responses[200] = {
                schema: { $ref: "#/definitions/Transactions" },
                message: 'O usuário foi cadastrado!!!'
        } */
        return response.status(200).json({
            status: 200,
            transactions: transactions_view_1.transactionRenderMany(transactions)
        });
    }
};
