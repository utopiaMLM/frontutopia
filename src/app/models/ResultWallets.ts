import { WalletBlockchainModel } from './WalletBlockchainModel';


export interface ResultWallets {  

  data:
  {
    _id: any,
    walletblockchains: Array<WalletBlockchainModel>
  }
  
}
