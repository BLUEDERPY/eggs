import { http, createConfig, fallback, unstable_connector } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";
const auroraTestnet = {
  id: 57054,
  name: "Sonic Blaze Testnet",
  network: "SONIC",
  nativeCurrency: {
    name: "Sonic",
    symbol: "S",
    decimals: 18,
  },
  rpcUrls: {
    //infura: 'https://aurora-testnet.infura.io/v3/YOUR_API_KEY',
    default: "https://rpc.blaze.soniclabs.com",
  },
  testnet: true,
};
export const config = createConfig({
  chains: [sepolia],
  connectors: [injected()],

  transports: {
    // RPC URL for each chain
    [sepolia.id]: [injected()],
  },
});
