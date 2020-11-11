import {Transaction} from '../models';

export function calculateAvaregeAmount(transactions: Transaction[]): number {
  const transactionAmount = transactions.map(transaction => transaction.amount);

  return eval(transactionAmount.join('+')) / transactions.length;
}
