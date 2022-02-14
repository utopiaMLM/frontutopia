import { BlockchainModel } from './BlockchainModel';

export class CryptoCurrencyModel {
  public blockchain: BlockchainModel;
  public _id?: string;
  public status: boolean;
  public name?: string;
  public image?: string;
  public url?: string;
  public symbol?: string;
  public namequery?: string;
  public blockchainSymbol?: string;
  public smartcontract?: string;
}