import Transaction from '../models/Transaction'
import TransactionDTO from '../DTO/Transaction'

interface Balance {
  income: number
  outcome: number
  total: number
}

class Transactions {
  private transactions: Array<Transaction>

  constructor() {
    this.transactions = []
  }

  public all(): Array<Transaction> {
    return this.transactions
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((accumulator, current) => {
      return current.type === 'income' ? accumulator + current.value : accumulator
    }, 0)
    const outcome = this.transactions.reduce((accumulator, current) => {
      return current.type === 'outcome' ? accumulator + current.value : accumulator
    }, 0)

    const total = income - outcome

    return {
      income,
      outcome,
      total
    }
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const balance = this.getBalance()
    if (type === 'outcome' && balance.total < value) {
      throw new Error('Insufficient funds.')
    }
    const transaction = new Transaction({ title, value, type })
    this.transactions.push(transaction)
    return transaction
  }
}

export default Transactions
