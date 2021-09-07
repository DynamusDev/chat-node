"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRenderMany = exports.chatRender = void 0;
function chatRender(message) {
    return {
        id: message.id,
        message: message.message,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
        deletedAt: message.deletedAt,
    };
}
exports.chatRender = chatRender;
function chatRenderMany(messages) {
    return messages.map(message => ({
        id: message.id,
        message: message.message,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
        deletedAt: message.deletedAt,
        author: {
            id: message.author.id,
            name: message.author.name,
            email: message.author.email,
            image: message.author.image,
            createdAt: message.author.createdAt,
            updatedAt: message.author.updatedAt,
            deletedAt: message.author.deletedAt,
        },
    }));
}
exports.chatRenderMany = chatRenderMany;
