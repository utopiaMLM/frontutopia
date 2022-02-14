import { Transaction } from './Transaction';


export interface ResultTransactions {
  ok: boolean;
  transactions: Transaction[];  
}
