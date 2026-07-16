export enum TransactionType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum AssetType {
  STOCK = 'STOCK',
  BOND = 'BOND',
  CURRENCY = 'CURRENCY',
  COMMODITY = 'COMMODITY',
  ETF = 'ETF',
  CASH = 'CASH',
}

export interface Transaction {
  id: string;
  ticker: string;
  type: TransactionType;
  quantity: number;
  purchasePrice: number;
  currency: string;
  commission: number;
  platform: string;
  timestamp: string;
  comment?: string;
}

export interface OpenLot {
  quantity: number;
  purchasePrice: number;
  commission: number;
  timestamp: string;
}

export interface StoredAsset {
  ticker: string;
  name: string;
  boardid: string;
  assetType: AssetType;
  quantity: number;
  openLots: OpenLot[];
}

export interface UIAsset extends StoredAsset {
  avgPurchasePrice: number;
  currentPrice: number;
  previousClosePrice: number;
  dailyChangeAbs: number;
  dailyChangePercent: number;
  sparklineData: number[];
}
