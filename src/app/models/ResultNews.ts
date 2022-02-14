import { NewsModel } from './NewsModel';

export interface ResultNews {
  news: NewsModel;
  ok: boolean;
  count: number;
}
