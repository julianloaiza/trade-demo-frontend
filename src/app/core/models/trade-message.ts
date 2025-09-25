export interface TradeMessage {
  tradeId: string;
  account: string;
  securityId: string;
  idSource?: string;
  qty: number;
  price: number;
  ric?: string;
  ticker?: string;
  isin?: string;
  cusip?: string;
  sedol?: string;
}
