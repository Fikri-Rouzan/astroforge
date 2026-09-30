# AstroForge

## 📌 Description

AstroForge is a Web3 GameFi idle resource management platform centered on sci-fi space mining and fleet operations. Built with passive asset-farming mechanics, the platform allows players to acquire and command specialized starships, deploying them across active asteroid fields to continuously harvest valuable minerals over time. Players can track fleet productivity in real time, monitor fuel consumption, and execute strategic upgrades to boost extraction efficiency, while refining raw deep-space minerals into tokenized assets within an integrated spaceport economy.

---

## 🛠️ Tech Stack

| Category                    | Technologies Used                                                              |
| :-------------------------- | :----------------------------------------------------------------------------- |
| 🌐 **Programming Language** | `TypeScript`                                                                   |
| 🧩 **Framework**            | `Tailwind CSS`                                                                 |
| ⚛️ **Libraries**            | `ethers`, `React`, `React Router`, `Phaser`, `React Hot Toast`, `Lucide React` |
| ⚡ **Tool**                 | `Vite`                                                                         |

---

## ⚙️ Setup Instructions

1. **Prerequisites**
   - Node.js 24 or higher.
   - Git installed on your system.
   - PNPM 10 installed on your system (Optional).
   - A deployed and running Smart Contract instance.
   - A running backend API server.
   - A Web3 crypto wallet installed in your browser ([Brave Wallet](https://brave.com/wallet) recommended).

2. **Clone the Repository**

```bash
git clone https://github.com/Fikri-Rouzan/astroforge.git
cd astroforge
```

3. **Install Packages**

```bash
# Using npm
npm i

# Using pnpm
pnpm i
```

4. **Configure Environment Variables**

```bash
cp .env.example .env
```

- Open the `.env` file and configure the following variables

  ```env
  VITE_API_URL="YOUR_API_URL"
  VITE_CONTRACT_ADDRESS="YOUR_CONTRACT_ADDRESS"
  ```

5. **Run the Program**

```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev
```
