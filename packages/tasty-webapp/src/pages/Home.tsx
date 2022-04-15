// import Auction from '../components/Auction';
// import { useAppDispatch, useAppSelector } from '../../hooks';
// import { setOnDisplayAuctionNounId } from '../../state/slices/onDisplayAuction';
// import { push } from 'connected-react-router';
// import { nounPath } from '../../utils/history';
// import useOnDisplayAuction from '../../wrappers/onDisplayAuction';
// import { useEffect } from 'react';
import { useAuctionStore } from '../store/auctionStore';

interface HomeProps {
  initialAuctionId?: number;
}

const Home: React.FC<HomeProps> = props => {
  // const { initialAuctionId } = props;
  const state = useAuctionStore(state => state);
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

  return null;
};
export default Home;
