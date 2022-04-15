import { BigNumber, BigNumberish } from 'ethers';

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
  timestamp: BigNumberish;
}
