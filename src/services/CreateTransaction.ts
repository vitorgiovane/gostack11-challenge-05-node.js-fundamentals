import TransactionsRepository from '../repositories/Transactions';
import Transaction from '../models/Transaction';
import TransactionDTO from '../DTO/Transaction'

class CreateTransaction {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public run({ title, value, type }: TransactionDTO): Transaction {
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    })

    return transaction
  }
}

export default CreateTransaction;
