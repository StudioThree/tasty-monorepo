import { NounsAuctionHouseFactory } from '@nouns/contracts';
import { providers, BigNumberish, BigNumber } from 'ethers';
import config from '../config';
import { useAuctionStore } from '../store/auctionStore';

const BLOCKS_PER_DAY = 6_500;

const ChainSubscriber: React.FC = () => {
  const { setFullAuction, appendBid } = useAuctionStore.getState();

  const loadState = async () => {
    const wsProvider = new providers.WebSocketProvider(config.app.wsRpcUri);
    const nounsAuctionHouseContract = NounsAuctionHouseFactory.connect(
      config.addresses.nounsAuctionHouseProxy,
      wsProvider,
    );

    const bidFilter = nounsAuctionHouseContract.filters.AuctionBid(null, null, null, null);
    // const extendedFilter = nounsAuctionHouseContract.filters.AuctionExtended(null, null);
    // const createdFilter = nounsAuctionHouseContract.filters.AuctionCreated(null, null, null);
    // const settledFilter = nounsAuctionHouseContract.filters.AuctionSettled(null, null, null);

    const processBidFilter = async (
      nounId: BigNumberish,
      sender: string,
      value: BigNumberish,
      extended: boolean,
      event: any,
    ) => {
      const timestamp = (await event.getBlock()).timestamp;
      const transactionHash = event.transactionHash;
      appendBid({ nounId, sender, value, extended, transactionHash, timestamp });
    };
    // const processAuctionCreated = (
    //   nounId: BigNumberish,
    //   startTime: BigNumberish,
    //   endTime: BigNumberish,
    // ) => {
    //   dispatch(
    //     setActiveAuction(reduxSafeNewAuction({ nounId, startTime, endTime, settled: false })),
    //   );
    //   const nounIdNumber = BigNumber.from(nounId).toNumber();
    //   dispatch(push(nounPath(nounIdNumber)));
    //   dispatch(setOnDisplayAuctionNounId(nounIdNumber));
    //   dispatch(setLastAuctionNounId(nounIdNumber));
    // };
    // const processAuctionExtended = (nounId: BigNumberish, endTime: BigNumberish) => {
    //   dispatch(setAuctionExtended({ nounId, endTime }));
    // };
    // const processAuctionSettled = (nounId: BigNumberish, winner: string, amount: BigNumberish) => {
    //   dispatch(setAuctionSettled({ nounId, amount, winner }));
    // };

    // Fetch the current auction
    const currentAuction = await nounsAuctionHouseContract.auction();
    setFullAuction(currentAuction);
    // dispatch(setFullAuction(reduxSafeAuction(currentAuction)));
    // dispatch(setLastAuctionNounId(currentAuction.nounId.toNumber()));

    // Fetch the previous 24hours of  bids
    const previousBids = await nounsAuctionHouseContract.queryFilter(bidFilter, 0 - BLOCKS_PER_DAY);
    for (let event of previousBids) {
      if (event.args === undefined) return;
      processBidFilter(...(event.args as [BigNumber, string, BigNumber, boolean]), event);
    }

    nounsAuctionHouseContract.on(bidFilter, (nounId, sender, value, extended, event) =>
      processBidFilter(nounId, sender, value, extended, event),
    );
    // nounsAuctionHouseContract.on(createdFilter, (nounId, startTime, endTime) =>
    //   processAuctionCreated(nounId, startTime, endTime),
    // );
    // nounsAuctionHouseContract.on(extendedFilter, (nounId, endTime) =>
    //   processAuctionExtended(nounId, endTime),
    // );
    // nounsAuctionHouseContract.on(settledFilter, (nounId, winner, amount) =>
    //   processAuctionSettled(nounId, winner, amount),
    // );
  };
  loadState();

  return <></>;
};

export default ChainSubscriber;
