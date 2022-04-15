import { BigNumber } from 'ethers';
import create from 'zustand';
import { Auction, BidEvent } from '../types';
import { devtools } from 'zustand/middleware';

interface AuctionState {
  activeAuction?: Auction;
  bids: BidEvent[];
  setFullAuction: (auction: Auction) => void;
}

export const safeAuction = (auction: Auction): Auction => ({
  amount: BigNumber.from(auction.amount).toJSON(),
  bidder: auction.bidder,
  startTime: BigNumber.from(auction.startTime).toJSON(),
  endTime: BigNumber.from(auction.endTime).toJSON(),
  nounId: BigNumber.from(auction.nounId).toJSON(),
  settled: auction.settled,
});

export const useAuctionStore = create<AuctionState>(
  devtools(set => ({
    activeAuction: undefined,
    bids: [],
    setFullAuction: auction => set(state => ({ ...state, activeAuction: safeAuction(auction) })),
  })),
);
