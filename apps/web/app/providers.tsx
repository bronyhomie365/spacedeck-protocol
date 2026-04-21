"use client";
import React, { useState } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia, arbitrumSepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// [KINETIC RECONSTRUCTION 14.6]: RESILIENT TESTNET CORE
// This config isolates the injected provider to prevent extension-level collisions.
const config = createConfig({
  chains: [sepolia, arbitrumSepolia],
  connectors: [
    injected({ 
      target: 'metaMask',
      shimDisconnect: true // Prevents stale session lockups
    }),
  ],
  transports: {
    [sepolia.id]: http('https://ethereum-sepolia-rpc.publicnode.com'),
    [arbitrumSepolia.id]: http(),
  },
  ssr: true,
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  }));

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          initialChain={sepolia} 
          theme={darkTheme({
            accentColor: '#22c55e',
            accentColorForeground: 'black',
            borderRadius: 'small',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
