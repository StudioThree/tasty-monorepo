import { BigNumber } from 'ethers';
import create from 'zustand';
import {
  Auction,
  AuctionCreateEvent,
  AuctionExtendedEvent,
  AuctionSettledEvent,
  BidEvent,
} from '../types';
import { devtools } from 'zustand/middleware';

interface AuctionState {
  activeAuction?: Auction;
  bids: BidEvent[];
  setFullAuction: (auction: Auction) => void;
  appendBid: (bid: BidEvent) => void;
}

const safeAuction = (auction: Auction): Auction => ({
  amount: BigNumber.from(auction.amount).toJSON(),
  bidder: auction.bidder,
  startTime: BigNumber.from(auction.startTime).toJSON(),
  endTime: BigNumber.from(auction.endTime).toJSON(),
  nounId: BigNumber.from(auction.nounId).toJSON(),
  settled: auction.settled,
});

const safeBid = (bid: BidEvent): BidEvent => ({
  nounId: BigNumber.from(bid.nounId).toJSON(),
  sender: bid.sender,
  value: BigNumber.from(bid.value).toJSON(),
  extended: bid.extended,
  transactionHash: bid.transactionHash,
  timestamp: bid.timestamp,
});

const auctionsEqual = (
  a: Auction,
  b: AuctionSettledEvent | AuctionCreateEvent | BidEvent | AuctionExtendedEvent,
) => BigNumber.from(a.nounId).eq(BigNumber.from(b.nounId));

const containsBid = (bidEvents: BidEvent[], bidEvent: BidEvent) =>
  bidEvents.map(bid => bid.transactionHash).indexOf(bidEvent.transactionHash) >= 0;

const maxBid = (bids: BidEvent[]): BidEvent => {
  return bids.reduce((prev, current) => {
    return BigNumber.from(prev.value).gt(BigNumber.from(current.value)) ? prev : current;
  });
};

export const useAuctionStore = create<AuctionState>(
  devtools(set => ({
    activeAuction: undefined,
    bids: [],
    setFullAuction: auction => set(state => ({ ...state, activeAuction: safeAuction(auction) })),
    appendBid: bid =>
      set(state => {
        if (!(state.activeAuction && auctionsEqual(state.activeAuction, bid))) return;
        if (containsBid(state.bids, bid)) return;
        state.bids = [safeBid(bid), ...state.bids];
        const maxBid_ = maxBid(state.bids);
        state.activeAuction.amount = BigNumber.from(maxBid_.value).toJSON();
        state.activeAuction.bidder = maxBid_.sender;
        console.log('processed bid', bid);
      }),
  })),
);
