import { useState } from "react";
import { useEth } from "../contexts/EthContext";

export default function AddItem({
    itemName,
    setItemName,
    cost,
    setCost,
    setItemIndex,
}) {
    const { state } = useEth();
    const { accounts, contract, web3 } = state;
    const [isLoading, setIsLoading] = useState(false);
    console.log(state);

    async function handleSubmit() {
        setIsLoading(true);
        const costInWei = web3.utils.toWei(cost.toString(), "ether");
        const createItem = await contract.methods
            .createItem(itemName, costInWei)
            .send({
                from: accounts[0],
            });
        console.log(createItem);
        console.log(
            `Item Created: ${createItem} with Item Name: ${itemName} of Cost: ${cost} ETH`
        );
        const itemIndex =
            createItem.events.SupplyChainStep.returnValues._itemIndex;
        console.log("Item created with index:", itemIndex);

        setItemIndex(itemIndex);
        setIsLoading(false);
    }
    return (
        <div className="container">
            <h2>Add Item</h2> 
            <div className="group">
                <p className="note">Add Item to our Blockchain Network with unique name and cost of the item</p>
            </div>
            <div className="group">
                <label htmlFor="cost">Cost In ETH:</label>
                <input
                    type="text"
                    name="cost"
                    id="cost"
                    value={cost}
                    min={0.001}
                    max={10}
                    step={0.001}
                    onChange={(e) => setCost(e.target.value)}
                    disabled={isLoading}
                    required
                />
            </div>
            <div className="group">
                <label htmlFor="item">Item Identifier:</label>
                <input
                    type="text"
                    name="item"
                    id="item"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    disabled={isLoading}
                    required
                />
            </div>
            <div className="group">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? "Creating..." : "Create new Item"}
                </button>
            </div>
        </div>
    );
}
