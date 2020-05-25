import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type === 'income') {
      const transaction = this.transactionsRepository.create({
        title,
        value,
        type,
      });
      return transaction;
    }
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      const outcomeValue = value >= 0 ? -value : value;
      if (balance.total + outcomeValue < 0) {
        throw new Error("You don't have enough cash");
      }
      const transaction = this.transactionsRepository.create({
        title,
        value: outcomeValue,
        type,
      });
      return transaction;
    }
    throw new Error('Transaction type does not exists!');
  }
}

export default CreateTransactionService;
