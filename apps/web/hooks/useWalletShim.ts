// [STUB]: Temporary wallet adapter shim until @solana/wallet-adapter-react is installed.
// This allows the Glass Ship UI to render without crashing.
// Replace with real imports once: npm install @solana/wallet-adapter-react @solana/wallet-adapter-react-ui

import { useState, useCallback } from 'react';

export const useWallet = () => {
  const [connected] = useState(false);
  const connect = useCallback(() => {
    console.warn('[SPACEDECK] Wallet adapter not installed. Run: npm install @solana/wallet-adapter-react');
  }, []);
  return { connected, connect, publicKey: null, disconnect: () => {} };
};
