"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRenderMany = exports.transactionRender = void 0;
function transactionRender(transaction) {
    return {
        id: transaction.id,
        title: transaction.title,
        category: transaction.category,
        type: transaction.type,
        amount: transaction.amount,
        createdAt: transaction.createdAt
    };
}
exports.transactionRender = transactionRender;
function transactionRenderMany(transactions) {
    return transactions.map(transaction => ({
        id: transaction.id,
        title: transaction.title,
        category: transaction.category,
        type: transaction.type,
        amount: transaction.amount,
        createdAt: transaction.createdAt,
        user: {
            id: transaction.user.id,
            name: transaction.user.name,
            email: transaction.user.email,
            image: transaction.user.image,
        }
    }));
}
exports.transactionRenderMany = transactionRenderMany;
