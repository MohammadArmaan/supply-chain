import { useState } from "react";
import { useEth } from "../contexts/EthContext";

export default function Delivery({ itemName, cost, itemIndex, isPaymentDone }) {
    const { state } = useEth();
    const { accounts, contract } = state;

    const [isDelivered, setIsDelivered] = useState(false);
    const [isDeliveryLoading, setIsDeliveryLoading] = useState(false);
    async function handleDelivery() {
        try {
            setIsDeliveryLoading(true);
            if (
                !isPaymentDone ||
                !itemName ||
                !cost ||
                itemIndex === undefined ||
                itemIndex === null
            )
                return;

            const triggerDelivery = await contract.methods
                .triggerDelivery(itemIndex)
                .send({ from: accounts[0] });

            console.log("Delivery", triggerDelivery);

            // Event listener
            contract.events.SupplyChainStep().on("data", async function (e) {
                console.log("Event:", e);
                const itemObj = await contract.methods
                    .items(e.returnValues._itemIndex)
                    .call();
                console.log("Item paid!", itemObj._identifier);
            });
            setIsDelivered(true);
        } catch (err) {
        } finally {
            setIsDeliveryLoading(false);
        }
    }
    return (
        <div className="container">
            <div className="badge-group">
                <p className="badge">
                    {!isDelivered ? "NOT DELIVERED" : "DELIVERED"}
                </p>
            </div>
            <h2>Item Delivery</h2>
            <div className="group">
                {!cost || !itemName ? (
                    <p className="note">
                        Please add item to the supply chain and finsih the
                        payment inorder to deliver!
                    </p>
                ) : !isPaymentDone ? (
                    <p className="note">
                        Please finsih the payment of {itemName} to trigger the
                        delivery
                    </p>
                ) : !isDelivered ? (
                    <div className="group">
                        <p className="note">Deliver Items for {itemName}</p>
                        <button
                            type="button"
                            onClick={handleDelivery}
                            disabled={isDeliveryLoading}
                        >
                            {isDeliveryLoading
                                ? "Delivering..."
                                : `Deliver ${itemName}`}
                        </button>
                    </div>
                ) : (
                    <div className="group">
                        <p className="note">Item {itemName} is Delivered</p>
                        <img src="tick.gif" alt="Tick" />
                    </div>
                )}
            </div>
        </div>
    );
}
