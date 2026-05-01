// [STUB]: Temporary wallet modal shim until @solana/wallet-adapter-react-ui is installed.

import { useState, useCallback } from 'react';

export const useWalletModal = () => {
  const [visible, setVisible] = useState(false);
  return { visible, setVisible };
};
