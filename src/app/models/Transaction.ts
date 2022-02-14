import { BlockchainModel } from './BlockchainModel';
import { CryptoCurrencyModel } from './CryptoCurrencyModel';

export interface Transaction {
  _id?:any;
  walletAddress?:any;
  amount?: number;
  blockchain?: BlockchainModel;
  clientEmail?: string;
  clientName?: string;
  cryptoSelected?: CryptoCurrencyModel;
  cryptoToSend?: any;
  creationDate?: any;
  description?: any;
  user?: any;
  purchaseId?: any
  symbol?: any;
  creation_date?: Date;
  priceCryptoSelected?: number;
  status?: any;
  code_status?:number;
  totalarticle?: number;
  dateTransaction?: Date;
  wallet?: string;
  clientWallet?: string;
  cryptoprice?: number;
  cryptotosend?: number;
  cryptoCurrency?: string;
  timeOut?: number;
  sendtotal?: number;
  transactionId?: any;
  success?: boolean;
  continue?: boolean;
  incomplete?: boolean;
  witherrors?: boolean;
  cancel?: boolean;
  complete?:boolean;
  image?: any;
  timeout?: boolean;
  blockchainSymbol?:string;
  smartcontract?:string;
  isTimeOut?: boolean;
  processdate?:Date;
  process_date?:String;
}