import User from '../models/User';
import { chatRenderMany } from './chat_view';

export function userRender(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    messages: chatRenderMany(user.messages),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt,
  }
}

export function userRenderMany(users: User[]) {
  return users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    messages: chatRenderMany(user.messages),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt,
  }))
}