import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    this.transactions
      .filter(({ type }) => type === 'income')
      .forEach(item => {
        income += item.value;
      });

    let outcome = 0;
    this.transactions
      .filter(({ type }) => type === 'outcome')
      .forEach(item => {
        outcome += item.value;
      });

    const balance = {
      income,
      outcome,
      total: income + outcome,
    };

    return balance;
  }

  public create({ title, type, value }: Request): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
