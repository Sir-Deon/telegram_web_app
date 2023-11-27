import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WagmiConfig } from "wagmi";
import { avalancheFuji } from "wagmi/chains";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

const chains = [avalancheFuji];

// 1. Get projectId
const projectId = "c792ef48edbfaf811f519b5c2cee421a";

// 2. Create wagmiConfig
const metadata = {
  name: "BetKing",
  description: "Betking",
  url: "https://isfoody.netlify.app",
  icons: [],
};

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);
