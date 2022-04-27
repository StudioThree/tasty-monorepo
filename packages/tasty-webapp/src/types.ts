import { BigNumber, BigNumberish } from 'ethers';

export enum ChainId {
  Mainnet = 1,
  Rinkeby = 4,
  Hardhat = 31337,
}

export interface Auction {
  amount: BigNumber;
  bidder: string;
  endTime: BigNumber;
  startTime: BigNumber;
  nounId: BigNumber;
  settled: boolean;
}

export interface BidEvent {
  nounId: BigNumberish;
  sender: string;
  value: BigNumberish;
  extended: boolean;
  transactionHash: string;
  timestamp: number;
}

export interface AuctionCreateEvent {
  nounId: BigNumberish;
  startTime: BigNumberish;
  endTime: BigNumberish;
  settled: boolean;
}

export interface AuctionSettledEvent {
  nounId: BigNumberish;
  winner: string;
  amount: BigNumberish;
}

export interface AuctionExtendedEvent {
  nounId: BigNumberish;
  endTime: BigNumberish;
}

export interface Bid {
  nounId: BigNumber;
  sender: string;
  value: BigNumber;
  extended: boolean;
  transactionHash: string;
  timestamp: BigNumber;
}
