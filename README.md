# AstroForge

## 📌 Description

AstroForge is a Web3 GameFi idle resource management platform centered on sci-fi space mining and fleet operations. Built with passive asset-farming mechanics, the platform allows players to acquire and command specialized starships, deploying them across active asteroid fields to continuously harvest valuable minerals over time. Players can track fleet productivity in real time, monitor fuel consumption, and execute strategic upgrades to boost extraction efficiency, while refining raw deep-space minerals into tokenized assets within an integrated spaceport economy.

---

## 🛠️ Tech Stack

| Category                    | Technologies Used                                                                                          |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------- |
| 🌐 **Programming Language** | `TypeScript`                                                                                               |
| 🧩 **Framework**            | `Tailwind CSS`                                                                                             |
| ⚛️ **Libraries**            | `ethers`, `React`, `React Router`, `next-themes`, `Phaser`, `Motion`,<br>`React Hot Toast`, `Lucide React` |
| ⚡ **Tool**                 | `Vite`                                                                                                     |
| 🪙 **Crypto Wallet**        | `Brave Wallet`                                                                                             |

---

## ⚙️ Setup Instructions

1. **Prerequisites**
   - Node.js 24 or higher.
   - Git installed on your system.
   - PNPM 10 installed on your system (Optional).
   - A deployed and running Smart Contract instance.
   - A running backend API server.
   - A Web3 crypto wallet installed in your browser ([Brave Wallet](https://brave.com/wallet) recommended).

2. **Brave Wallet Local Network Setup**
   - Open `brave://settings/wallet/networks` in your Brave browser address bar and click **Add**.
   - Fill out the form with the following network details:
     - **Chain ID:** `31337`
     - **Chain Name:** `AstroForge Testnet`
     - **Currency Name:** `Ethereum`
     - **Currency Symbol:** `ETH`
     - **Decimals:** `18`
     - **RPC URL:** `http://127.0.0.1:8545`
     - **Block Explorer URL:** `https://etherscan.io`
   - Click **Submit** to save the new custom network.

3. **Import Local Test Account to Brave Wallet**
   - Open `brave://wallet/crypto/accounts` in your Brave browser.
   - Click the **+** button, select **Import account**, and choose **Ethereum**.
   - Paste one of the **Private Keys** generated when starting your local Ethereum node, provide an account name, and click **Import account**.
   - **Note:** Always ensure your Brave Wallet active connection is set to **AstroForge Testnet** and your newly imported account before testing the app, otherwise RPC and connection errors will occur.

4. **Clone the Repository**

```bash
git clone https://github.com/Fikri-Rouzan/astroforge.git
cd astroforge
```

5. **Install Packages**

```bash
# Using npm
npm i

# Using pnpm
pnpm i
```

6. **Configure Environment Variables**

```bash
cp .env.example .env
```

- Open the `.env` file and configure the following variables

  ```env
  VITE_API_URL="YOUR_API_URL"
  VITE_CONTRACT_ADDRESS="YOUR_CONTRACT_ADDRESS"
  ```

7. **Run the Program**

```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev
```
