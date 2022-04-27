import Modal from './Modal';
import WalletButton from './WalletButton';
import { WALLET_TYPE } from './WalletButton';
import clsx from 'clsx';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
// import { TrezorConnector } from '@web3-react/trezor-connector';
import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import config, { CHAIN_ID } from '../config';
import classes from './WalletConnectModal.module.css';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
// import { LedgerConnector } from '@web3-react/ledger-connector';

// There is a problem with the dependency of Ledger and Treor, @0x, which blocks builds.

const WalletConnectModal: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => {
  const { activate, active, error } = useWeb3React();
  const supportedChainIds = [CHAIN_ID];

  useEffect(() => {
    if (error && error instanceof UnsupportedChainIdError) {
      // warn user
      console.log('UnsupportedChainIdError', error);
    }
    if (active) {
      onDismiss();
    }
  }, [active, error, onDismiss]);

  const wallets = (
    <div className={classes.walletConnectModal}>
      {error && <p style={{ color: 'red' }}>Error: {error?.message}</p>}
      <WalletButton
        onClick={() => {
          const injected = new InjectedConnector({
            supportedChainIds,
          });
          activate(injected);
        }}
        walletType={WALLET_TYPE.metamask}
      />
      <WalletButton
        onClick={() => {
          const fortmatic = new FortmaticConnector({
            apiKey: 'pk_live_60FAF077265B4CBA',
            chainId: CHAIN_ID,
          });
          activate(fortmatic);
        }}
        walletType={WALLET_TYPE.fortmatic}
      />
      <WalletButton
        onClick={() => {
          const walletlink = new WalletConnectConnector({
            supportedChainIds,
            chainId: CHAIN_ID,
            rpc: {
              [CHAIN_ID]: config.app.jsonRpcUri,
            },
          });
          activate(walletlink);
        }}
        walletType={WALLET_TYPE.walletconnect}
      />
      <WalletButton
        onClick={() => {
          const walletlink = new WalletLinkConnector({
            appName: 'Nouns.WTF',
            appLogoUrl: 'https://nouns.wtf/static/media/logo.cdea1650.svg',
            url: config.app.jsonRpcUri,
            supportedChainIds,
          });
          activate(walletlink);
        }}
        walletType={WALLET_TYPE.coinbaseWallet}
      />
      <WalletButton
        onClick={() => {
          const injected = new InjectedConnector({
            supportedChainIds,
          });
          activate(injected);
        }}
        walletType={WALLET_TYPE.brave}
      />
      {/* <WalletButton
        onClick={() => {
          const ledger = new LedgerConnector({
            chainId: supportedChainIds[0],
            url: config.app.jsonRpcUri,
          });
          activate(ledger);
        }}
        walletType={WALLET_TYPE.ledger}
      /> */}
      {/* <WalletButton
        onClick={() => {
          const trezor = new TrezorConnector({
            chainId: CHAIN_ID,
            url: config.app.jsonRpcUri,
            manifestAppUrl: 'https://nouns.wtf',
            manifestEmail: 'nounops+trezorconnect@protonmail.com',
          });
          activate(trezor);
        }}
        walletType={WALLET_TYPE.trezor}
      /> */}
      <div
        className={clsx(classes.clickable, classes.walletConnectData)}
        onClick={() => {
          console.log(localStorage.removeItem('walletconnect'));
        }}
      >
        Clear WalletConnect Data
      </div>
    </div>
  );
  return <Modal title="Connect your wallet" content={wallets} onDismiss={onDismiss} />;
};

export default WalletConnectModal;
