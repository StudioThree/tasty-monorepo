// import Auction from '../components/Auction';
// import { useAppDispatch, useAppSelector } from '../../hooks';
// import { setOnDisplayAuctionNounId } from '../../state/slices/onDisplayAuction';
// import { push } from 'connected-react-router';
// import { nounPath } from '../../utils/history';
// import useOnDisplayAuction from '../../wrappers/onDisplayAuction';
// import { useEffect } from 'react';
import { BigNumber } from 'ethers';
import { useAuctionStore } from '../store/auctionStore';
import dayjs from 'dayjs';
import { BidEvent } from '../types';
import { useMemo } from 'react';
import { ethers } from 'ethers';

const sortBids = (bids: BidEvent[]): BidEvent[] =>
  [...bids].sort((a, b) => b.timestamp - a.timestamp);

export default function Home() {
  console.log('home');
  // const { initialAuctionId } = props;
  const state = useAuctionStore(state => state);
  const bids = useAuctionStore(state => state.bids);

  const sortedBids = useMemo(() => sortBids(bids), [bids]);
  console.log(state);
  // const onDisplayAuction = useOnDisplayAuction();
  // const lastAuctionNounId = useAppSelector(state => state.onDisplayAuction.lastAuctionNounId);

  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (!lastAuctionNounId) return;

  //   if (initialAuctionId !== undefined) {
  //     // handle out of bounds noun path ids
  //     if (initialAuctionId > lastAuctionNounId || initialAuctionId < 0) {
  //       dispatch(setOnDisplayAuctionNounId(lastAuctionNounId));
  //       dispatch(push(nounPath(lastAuctionNounId)));
  //     } else {
  //       if (onDisplayAuction === undefined) {
  //         // handle regular noun path ids on first load
  //         dispatch(setOnDisplayAuctionNounId(initialAuctionId));
  //       }
  //     }
  //   } else {
  //     // no noun path id set
  //     if (lastAuctionNounId) {
  //       dispatch(setOnDisplayAuctionNounId(lastAuctionNounId));
  //     }
  //   }
  // }, [lastAuctionNounId, dispatch, initialAuctionId, onDisplayAuction]);

  // return <Auction auction={onDisplayAuction} />;

  return (
    <div>
      <h1>Home</h1>
      <p style={{ color: 'black' }}>
        Current noun id ={' '}
        {state.activeAuction?.nounId && BigNumber.from(state.activeAuction?.nounId).toString()}
      </p>
      <h3>Bids</h3>
      <ul>
        {sortedBids.map(bid => (
          <li key={bid.transactionHash}>
            {dayjs(bid.timestamp * 1000).format('MMM DD')} at{' '}
            {dayjs(bid.timestamp * 1000).format('hh:mm a')} - {ethers.utils.formatEther(bid.value)}{' '}
            ETH - {bid.sender}
          </li>
        ))}
      </ul>
    </div>
  );
}
