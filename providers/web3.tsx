import { createAppKit } from '@reown/appkit';
import { polygonMumbai } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Config, cookieStorage, cookieToInitialState, createStorage } from '@wagmi/core';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

const metadata = {
  name: 'OwnFT',
  description: 'OwnFT',
  url: '',
  icons: [''],
};

const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  networks: [polygonMumbai],
});

createAppKit({
  adapters: [wagmiAdapter],
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  networks: [polygonMumbai],
  defaultNetwork: polygonMumbai,
  metadata: metadata,
  features: {
    analytics: true,
    email: false,
    socials: [],
    emailShowWallets: false,
  },
});

interface Props {
  children: React.ReactNode;
  cookies?: string | null;
}

const Web3Provider = ({ children, cookies }: Props) => {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
