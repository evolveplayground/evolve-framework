// Evolve Framework Currency and Market Types

// This module defines the core structures for currencies, markets, tradable items, and transactions
// within the Evolve Framework. These types are essential for managing economic interactions.

// Interface representing a currency
export interface Currency {
  code: string; // Unique code for the currency (e.g., USD, BTC)
  name: string; // Name of the currency
  symbol: string; // Symbol used for the currency (e.g., $, ¥)
  decimals: number; // Number of decimal places for fractional values
  isVirtual: boolean; // Indicates if the currency is virtual (non-physical)
  totalSupply: number; // Total amount of currency in circulation
}

// Interface representing a market
export interface Market {
  id: string; // Unique identifier for the market
  name: string; // Name of the market
  type: MarketType; // Type/category of the market
  tradedItems: TradableItem[]; // List of items being traded in the market
  participants: string[]; // IDs of agents participating in the market
  currentPrices: Map<string, number>; // Current prices of items (item ID to price mapping)
}

// Enum defining types of markets
export enum MarketType {
  GOODS = 'GOODS',
  SERVICES = 'SERVICES',
  VIRTUAL_ASSETS = 'VIRTUAL_ASSETS',
  LABOR = 'LABOR',
  INFORMATION = 'INFORMATION'
}

// Interface for tradable items
export interface TradableItem {
  id: string; // Unique identifier for the item
  name: string; // Name of the item
  type: MarketType; // Category/type of the item
  description: string; // Description of the item
  basePrice: number; // Base price of the item
  rarity: number; // Rarity score of the item (scale: 1-100)
}

// Interface representing a transaction
export interface Transaction {
  id: string; // Unique identifier for the transaction
  timestamp: number; // Timestamp when the transaction occurred
  seller: string; // ID of the seller
  buyer: string; // ID of the buyer
  item: TradableItem; // Item being transacted
  quantity: number; // Quantity of the item being traded
  price: number; // Price at which the item was sold
  currency: string; // Currency used for the transaction
  marketId: string; // ID of the market where the transaction occurred
}

/*
Note: This file is currently experimental and not yet fully integrated with the Evolve Framework core.
The implementation is subject to change and should not be used in production environments.
For further details, visit: https://github.com/evolveplayground/evolve-framework
*/
