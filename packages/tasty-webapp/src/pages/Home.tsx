import { BigNumber } from 'ethers';
import { useAuctionStore } from '../store/auctionStore';
import dayjs from 'dayjs';
import { BidEvent } from '../types';
import { useMemo, useState } from 'react';
import { ethers } from 'ethers';
import WalletConnectModal from '../components/WalletConnectModal';
import { useWeb3React } from '@web3-react/core';

const sortBids = (bids: BidEvent[]): BidEvent[] =>
  [...bids].sort((a, b) => b.timestamp - a.timestamp);

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const state = useAuctionStore(state => state);
  const bids = useAuctionStore(state => state.bids);
  const { account, deactivate } = useWeb3React();

  const sortedBids = useMemo(() => sortBids(bids), [bids]);

  return (
    <div>
      {account ? (
        <button onClick={deactivate}>DISCONNECT</button>
      ) : (
        <button onClick={() => setShowModal(true)}>Connect</button>
      )}
      {showModal && <WalletConnectModal onDismiss={() => setShowModal(false)} />}
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
