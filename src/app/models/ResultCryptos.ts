import { BlockchainCryptoModel } from './BlockchainCryptoModel';


export interface ResultCrypto {  
  ok: boolean;
  cryptos: Array<BlockchainCryptoModel>;
}
