import { ArticleModel } from './ArticleModel';

export interface ResultArticle {
  article: ArticleModel;
  ok: boolean;
  amount: number;
  cryptos: Array<any>;
}
