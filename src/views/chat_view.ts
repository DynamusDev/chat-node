import Chat from '../models/Chat';
import { userRender } from './user_view';

export function chatRender(message: Omit<Chat, 'author.password'>) {
  return {
    id: message.id,
    message: message.message,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
    deletedAt: message.deletedAt,
    author: userRender(message.author),
  }
}

export function chatRenderMany(messages: Chat[]) {
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
  }))
}