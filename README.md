# Supply Chain DApp

A decentralized supply chain management application built with **Solidity**, **React**, **Truffle**, and **Web3.js**.  
This DApp allows creating items, making payments on-chain, and tracking their status (Created → Paid → Delivered) on the **Ethereum Sepolia Testnet**.

---

## 📌 Features

- **Smart Contracts**
  - `Ownable` – contract ownership & access control.
  - `Item` – represents a purchasable item with ETH payments.
  - `ItemManager` – manages supply chain flow (Create → Pay → Deliver).
  - `withdraw()` – owner can withdraw ETH from contract.

- **Frontend**
  - Built with **React.js**.
  - Connect wallet (MetaMask).
  - Create items with cost (ETH).
  - Pay for items (converts ETH → Wei).
  - Track item states (`Created`, `Paid`, `Delivered`).
  - Navbar dropdown shows:
    - Account address
    - Account balance (up to 4 decimals)

- **Deployment**
  - Uses **Truffle** with **HDWalletProvider**.
  - Deployable to **Sepolia Testnet** via Infura/Alchemy RPC.
  - The UI part of the Supply Chain DApp is live here: [Supply Chain UI](https://supply-chain-react.vercel.app/)


---

## 🛠️ Tech Stack

- **Smart Contracts**: Solidity (v0.8.18)
- **Framework**: Truffle
- **Frontend**: React.js, Web3.js
- **Wallet**: MetaMask
- **Network**: Ethereum Sepolia Testnet
- **Provider**: Infura / Alchemy
- **Env Management**: dotenv

