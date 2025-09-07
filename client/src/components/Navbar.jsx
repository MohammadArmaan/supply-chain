import { useState, useEffect } from "react";
import { useEth } from "../contexts/EthContext";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FiCopy } from "react-icons/fi";

export default function Navbar() {
  const { state } = useEth();
  const { accounts, web3, contract } = state;
  const [balance, setBalance] = useState(null);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      if (accounts && accounts.length > 0 && web3) {
        const bal = await web3.eth.getBalance(accounts[0]);
        setBalance(parseFloat(web3.utils.fromWei(bal, "ether")).toFixed(4));
      }
    };
    fetchBalance();
  }, [accounts, web3]);

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(`${label} copied!`);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <nav className="nav">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="wallet-control">
          Account & Contract Details
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="wallet-menu" sideOffset={5}>
          {accounts && accounts.length > 0 ? (
            <>
              <DropdownMenu.Item
                onClick={() => handleCopy(accounts[0], "Account hash")}
                className="wallet-item"
              >
                Account: {accounts[0].slice(0, 6)}...
                {accounts[0].slice(-4)} <FiCopy className="copy-icon" />
              </DropdownMenu.Item>

              <DropdownMenu.Item className="wallet-item">
                Balance: {balance ? `${balance} ETH` : "Loading..."}
              </DropdownMenu.Item>

              {contract && contract._address && (
                <DropdownMenu.Item
                  onClick={() =>
                    handleCopy(contract._address, "Contract address")
                  }
                  className="wallet-item"
                >
                  Contract: {contract._address.slice(0, 6)}...
                  {contract._address.slice(-4)} <FiCopy className="copy-icon" />
                </DropdownMenu.Item>
              )}
            </>
          ) : (
            <DropdownMenu.Item className="wallet-item">
              No wallet connected
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      {copied && <p className="copied-msg">{copied}</p>}
    </nav>
  );
}
