import { useState, useEffect } from "react";
import { useEth } from "../contexts/EthContext";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function Navbar() {
  const { state } = useEth();
  const { accounts, web3 } = state;
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (accounts && accounts.length > 0 && web3) {
        const bal = await web3.eth.getBalance(accounts[0]);
        setBalance(parseFloat(web3.utils.fromWei(bal, "ether")).toFixed(4));
      }
    };
    fetchBalance();
  }, [accounts, web3]);

  // Dropdown options
  const options = accounts && accounts.length > 0 ? [
    {
      value: "account",
      label: `Account: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
    },
    {
      value: "balance",
      label: `Balance: ${balance ? `${balance} ETH` : "Loading..."}`,
    },
  ] : [
    { value: "no-wallet", label: "No wallet connected" },
  ];

  return (
    <nav className="nav">
      <Dropdown 
        options={options} 
        placeholder="Account Details" 
        className="wallet-dropdown"
        controlClassName="wallet-control" 
        menuClassName="wallet-menu" 
        
      />
    </nav>
  );
}
