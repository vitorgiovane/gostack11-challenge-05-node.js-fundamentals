interface Transaction {
  title: string
  value: number
  type: 'income' | 'outcome'
}

export default Transaction
