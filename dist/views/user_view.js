"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRenderMany = exports.userRender = void 0;
const chat_view_1 = require("./chat_view");
const transactions_view_1 = require("./transactions_view");
function userRender(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        messages: chat_view_1.chatRenderMany(user.messages),
        transactions: user.transactions,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
    };
}
exports.userRender = userRender;
function userRenderMany(users) {
    return users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        messages: chat_view_1.chatRenderMany(user.messages),
        transactions: transactions_view_1.transactionRenderMany(user.transactions),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
    }));
}
exports.userRenderMany = userRenderMany;
