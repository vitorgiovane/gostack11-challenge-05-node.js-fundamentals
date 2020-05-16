import { Router } from 'express';

import TransactionsRepository from '../repositories/Transactions';
import CreateTransaction from '../services/CreateTransaction';

import isEmpty from '../utils/isEmpty'

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository()

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all()
    const balance = transactionsRepository.getBalance()
    return response.json({ transactions, balance })
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  const { title, value, type } = request.body
  if (isEmpty(title) || isEmpty(value) || isEmpty(type))
    return response.json({ error: "The title, value and type are required." })

  const createTransaction = new CreateTransaction(transactionsRepository)
  try {
    const transaction = createTransaction.run({
      title, value, type
    })
    return response.json(transaction)
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
