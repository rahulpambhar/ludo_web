import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { store } from "./state/store";

import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { bsc } from "wagmi/chains";
import { ToastContainer } from "react-toastify";


import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const { chains, publicClient } = configureChains([bsc], [publicProvider()]);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "0e6b37fb8ec706420bd9ea74abe585dc",
        isNewChainsStale: false,
      },
    }),
  ],
  publicClient,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <WagmiConfig config={config}>
      <App />
      <ToastContainer />
    </WagmiConfig>
  </Provider>
  // </React.StrictMode>,
)
