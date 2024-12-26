import { createConfig, http, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";
import { metaMask, walletConnect } from "wagmi/connectors";
import { localhost } from "viem/chains";
import { createPublicClient } from "viem";
const viemClient = createPublicClient({
  chain: localhost, //imported from viem/chains
  transport: http(), //imported from viem
});
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

/*export const config = createConfig({
  chains: [mainnet, localhost],
  connectors: [
    walletConnect({ projectId: "3fbb6bba6f1de962d911bb5b5c9dba88" }),
    metaMask(),
  ],
  client: () => viemClient,
});*/
const _config = getDefaultConfig({
  // Your dApps chains
  chains: [sepolia, mainnet],
  storage: createStorage({ storage: window.localStorage }),

  transports: {
    // RPC URL for each chain
    [mainnet.id]: http(
      `https://eth-mainnet.g.alchemy.com/v2/3AgF019UXqiHyZ62YAXQgWSw2q-XRFGs`
    ),
    [sepolia.id]: http(
      `https://eth-sepolia.g.alchemy.com/v2/3AgF019UXqiHyZ62YAXQgWSw2q-XRFGs`
    ),
  },

  // Required API Keys
  walletConnectProjectId: "3fbb6bba6f1de962d911bb5b5c9dba88",

  // Required App Info
  appName: "LoopDaWoop",
});
export const config = createConfig({ ..._config });
