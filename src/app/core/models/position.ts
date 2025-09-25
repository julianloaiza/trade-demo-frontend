export interface Position {
  key: string;        // `${account}-${securityId}`
  account: string;
  securityId: string;
  totalShares: number;
  lastUpdated: Date;
}
