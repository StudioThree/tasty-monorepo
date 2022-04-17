import { getContractAddressesForChainOrThrow } from '@nouns/sdk';
import { ChainId } from './types';

interface AppConfig {
  jsonRpcUri: string;
  wsRpcUri: string;
  subgraphApiUri: string;
  enableHistory: boolean;
}

type SupportedChains = ChainId.Mainnet | ChainId.Rinkeby | ChainId.Hardhat;

export const CHAIN_ID: SupportedChains = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1');

export const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY ?? '';

export const createNetworkHttpUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.toUpperCase()}_JSONRPC`];
  return (
    custom ||
    `https://eth-${network}.alchemyapi.io/v2/${
      process.env[`REACT_APP_ALCHEMY_${network.toUpperCase()}_KEY`]
    }`
  );
};

export const createNetworkWsUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.toUpperCase()}_WSRPC`];
  return (
    custom ||
    `wss://eth-${network}.alchemyapi.io/v2/${
      process.env[`REACT_APP_ALCHEMY_${network.toUpperCase()}_KEY`]
    }`
  );
};

const app: Record<SupportedChains, AppConfig> = {
  [ChainId.Rinkeby]: {
    jsonRpcUri: createNetworkHttpUrl('rinkeby'),
    wsRpcUri: createNetworkWsUrl('rinkeby'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph-rinkeby-v4',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [ChainId.Mainnet]: {
    jsonRpcUri: createNetworkHttpUrl('mainnet'),
    wsRpcUri: createNetworkWsUrl('mainnet'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [ChainId.Hardhat]: {
    jsonRpcUri: 'http://localhost:8545',
    wsRpcUri: 'ws://localhost:8545',
    subgraphApiUri: '',
    enableHistory: false,
  },
};

const config = {
  app: app[CHAIN_ID],
  addresses: getContractAddressesForChainOrThrow(CHAIN_ID),
};

export default config;
