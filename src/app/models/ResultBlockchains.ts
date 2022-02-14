import { BlockchainModel } from './BlockchainModel';

export interface ResultBlockchains {
  ok: boolean;
  data: Array<BlockchainModel>;
}
