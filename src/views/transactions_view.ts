import Transaction from '../models/Transaction';
import { userRender } from './user_view';

export function transactionRender(transaction: Transaction) {
  return {
    id: transaction.id,
    title: transaction.title,
    category: transaction.category,
    type: transaction.type,
    amount: transaction.amount,
    createdAt: transaction.createdAt
  }
}

export function transactionRenderMany(transactions: Transaction[]) {
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
  }))
}